var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => SyncMdPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  defaultCommitMessage: "vault backup: {{date}}",
  showRibbonIcon: true
};
var SyncMdPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
    /** Tracks whether we're waiting for a callback from Sync.md. */
    this.pendingAction = null;
    /** Safety timeout so the "waiting" state doesn't hang forever. */
    this.timeoutId = null;
  }
  // -----------------------------------------------------------------------
  // Lifecycle
  // -----------------------------------------------------------------------
  async onload() {
    await this.loadSettings();
    this.registerObsidianProtocolHandler("syncmd-result", (params) => {
      this.handleCallback(params);
    });
    this.addCommand({
      id: "syncmd-pull",
      name: "Pull changes from GitHub",
      callback: () => this.executePull()
    });
    this.addCommand({
      id: "syncmd-push",
      name: "Push changes to GitHub",
      callback: () => this.executePush()
    });
    this.addCommand({
      id: "syncmd-sync",
      name: "Sync (pull then push)",
      callback: () => this.executeSync()
    });
    this.addCommand({
      id: "syncmd-status",
      name: "Show repository status",
      callback: () => this.executeStatus()
    });
    if (this.settings.showRibbonIcon) {
      this.addRibbonIcon("refresh-cw", "Sync with GitHub (Sync.md)", () => {
        this.executeSync();
      });
    }
    this.addSettingTab(new SyncMdSettingTab(this.app, this));
  }
  // -----------------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------------
  /**
   * The vault folder name is the shared identifier between
   * the Obsidian vault and Sync.md's `RepoConfig.vaultFolderName`.
   */
  getRepoName() {
    return this.app.vault.getName();
  }
  /** Expand template tokens in the commit message. */
  formatCommitMessage() {
    const now = /* @__PURE__ */ new Date();
    return this.settings.defaultCommitMessage.replace("{{date}}", now.toISOString().split("T")[0]).replace("{{datetime}}", now.toISOString());
  }
  /**
   * Build and open a `syncmd://x-callback-url/<action>` URL.
   *
   * On iOS this triggers an app-switch to Sync.md which performs the
   * requested git operation and redirects back to Obsidian via the
   * `obsidian://syncmd-result` protocol handler.
   */
  openSyncMd(action, extra = {}) {
    if (!import_obsidian.Platform.isMobile) {
      new import_obsidian.Notice(
        "Sync.md sync is only available on iOS. Use git on desktop.",
        5e3
      );
      return;
    }
    const params = new URLSearchParams({
      repo: this.getRepoName(),
      "x-success": "obsidian://syncmd-result",
      "x-error": "obsidian://syncmd-result",
      ...extra
    });
    const url = `syncmd://x-callback-url/${action}?${params.toString()}`;
    this.pendingAction = action;
    this.timeoutId = window.setTimeout(() => {
      if (this.pendingAction) {
        new import_obsidian.Notice(
          "\u26A0\uFE0F No response from Sync.md. Is the app installed?",
          5e3
        );
        this.pendingAction = null;
      }
    }, 3e4);
    window.open(url);
  }
  // -----------------------------------------------------------------------
  // Actions
  // -----------------------------------------------------------------------
  executePull() {
    new import_obsidian.Notice("\u23F3 Opening Sync.md to pull\u2026");
    this.openSyncMd("pull");
  }
  executePush() {
    new import_obsidian.Notice("\u23F3 Opening Sync.md to push\u2026");
    this.openSyncMd("push", {
      message: this.formatCommitMessage()
    });
  }
  executeSync() {
    new import_obsidian.Notice("\u23F3 Opening Sync.md to sync\u2026");
    this.openSyncMd("sync", {
      message: this.formatCommitMessage()
    });
  }
  executeStatus() {
    new import_obsidian.Notice("\u23F3 Checking repository status\u2026");
    this.openSyncMd("status");
  }
  // -----------------------------------------------------------------------
  // Callback handler
  // -----------------------------------------------------------------------
  /**
   * Called when Obsidian opens `obsidian://syncmd-result?…`.
   * Sync.md appends action-specific query parameters.
   */
  handleCallback(params) {
    var _a, _b;
    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.pendingAction = null;
    const action = (_a = params["action"]) != null ? _a : "unknown";
    const status = params["status"];
    if (status === "ok") {
      this.handleSuccess(action, params);
    } else {
      const message = (_b = params["message"]) != null ? _b : "Unknown error";
      new import_obsidian.Notice(`\u274C ${action} failed: ${message}`, 6e3);
    }
  }
  handleSuccess(action, params) {
    var _a, _b;
    const sha = params["sha"] ? ` (${params["sha"].substring(0, 7)})` : "";
    switch (action) {
      case "pull": {
        const updated = params["updated"] === "true";
        if (updated) {
          new import_obsidian.Notice(`\u2705 Pull complete${sha}`, 4e3);
        } else {
          new import_obsidian.Notice("\u2705 Already up to date", 3e3);
        }
        break;
      }
      case "push":
        new import_obsidian.Notice(`\u2705 Push complete${sha}`, 4e3);
        break;
      case "sync": {
        const skipped = params["push_skipped"] === "true";
        if (skipped) {
          new import_obsidian.Notice(
            `\u2705 Synced \u2014 no local changes to push${sha}`,
            4e3
          );
        } else {
          new import_obsidian.Notice(`\u2705 Sync complete${sha}`, 4e3);
        }
        break;
      }
      case "status": {
        const branch = (_a = params["branch"]) != null ? _a : "?";
        const changes = (_b = params["changes"]) != null ? _b : "0";
        new import_obsidian.Notice(
          `\u{1F4CA} Branch: ${branch} \xB7 Changes: ${changes}${sha}`,
          6e3
        );
        break;
      }
      default:
        new import_obsidian.Notice(`\u2705 ${action} complete${sha}`, 3e3);
    }
  }
  // -----------------------------------------------------------------------
  // Settings persistence
  // -----------------------------------------------------------------------
  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      await this.loadData()
    );
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var SyncMdSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Sync.md \u2013 Git Sync" });
    containerEl.createEl("p", {
      text: "Sync your vault with GitHub through the Sync.md iOS app. Make sure Sync.md is installed and this vault is configured there.",
      cls: "setting-item-description"
    });
    new import_obsidian.Setting(containerEl).setName("Default commit message").setDesc("Use {{date}} for YYYY-MM-DD, {{datetime}} for ISO timestamp").addText(
      (text) => text.setPlaceholder("vault backup: {{date}}").setValue(this.plugin.settings.defaultCommitMessage).onChange(async (value) => {
        this.plugin.settings.defaultCommitMessage = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Show ribbon icon").setDesc("Show a sync button in the left sidebar (reload required)").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.showRibbonIcon).onChange(async (value) => {
        this.plugin.settings.showRibbonIcon = value;
        await this.plugin.saveSettings();
        new import_obsidian.Notice("Reload Obsidian to apply ribbon icon change");
      })
    );
    containerEl.createEl("h3", { text: "How it works" });
    const info = containerEl.createEl("div");
    info.createEl("p", {
      text: "When you run a sync command this plugin:"
    });
    const list = info.createEl("ol");
    list.createEl("li", {
      text: "Opens Sync.md via its URL scheme with the requested action"
    });
    list.createEl("li", {
      text: "Sync.md performs the git operation (pull / push / sync)"
    });
    list.createEl("li", {
      text: "Sync.md redirects back to Obsidian with the result"
    });
    const vaultName = this.plugin.app.vault.getName();
    const note = info.createEl("p");
    note.createEl("strong", { text: "Vault name: " });
    note.createEl("code", { text: vaultName });
    info.createEl("p", {
      text: "This vault name must match the repository's folder name in Sync.md. If they don't match, open Sync.md and verify the vault folder name."
    });
  }
};
