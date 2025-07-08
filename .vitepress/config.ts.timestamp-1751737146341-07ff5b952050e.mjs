Fil// .vitepress/config.ts
import { defineConfig } from "file:///Users/codybontecou/dev/blog/node_modules/vitepress/dist/node/index.js";
import path from "path";
var __vite_injected_original_dirname = "/Users/codybontecou/dev/blog/.vitepress";
var config_default = defineConfig({
  srcExclude: ["**/templates/**", "**/node_modules/**"],
  vite: {
    css: {
      postcss: "./postcss.config.cjs"
    },
    resolve: {
      alias: {
        "~/lib/utils/cn": path.resolve(__vite_injected_original_dirname, "../lib/utils/cn.ts"),
        "~/composables": path.resolve(__vite_injected_original_dirname, "../composables"),
        "~": path.resolve(__vite_injected_original_dirname, "../"),
        "@": path.resolve(__vite_injected_original_dirname, "../")
      }
    }
  },
  title: "Cody Bontecou",
  description: "Personal blog and portfolio",
  // Site config
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  // Theme config
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Blog", link: "/blog" },
      { text: "About", link: "/about" },
      { text: "Projects", link: "/projects" },
      { text: "Talks", link: "/talks" }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/codybontecou" }
    ],
    footer: {
      message: "Built with VitePress",
      copyright: "Copyright \xA9 2025 Cody Bontecou"
    }
  },
  // Build config for static generation
  outDir: "dist",
  base: "/",
  // Markdown config
  markdown: {
    theme: "github-dark",
    lineNumbers: false,
    anchor: {
      permalink: false
    }
  },
  // Head config for SEO
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      }
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      }
    ],
    [
      "link",
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Cody Bontecou RSS Feed",
        href: "/rss.xml"
      }
    ]
  ]
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvY29keWJvbnRlY291L2Rldi9ibG9nLy52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9jb2R5Ym9udGVjb3UvZGV2L2Jsb2cvLnZpdGVwcmVzcy9jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2NvZHlib250ZWNvdS9kZXYvYmxvZy8udml0ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgc3JjRXhjbHVkZTogWycqKi90ZW1wbGF0ZXMvKionLCAnKiovbm9kZV9tb2R1bGVzLyoqJ10sXG4gICAgdml0ZToge1xuICAgICAgICBjc3M6IHtcbiAgICAgICAgICAgIHBvc3Rjc3M6ICcuL3Bvc3Rjc3MuY29uZmlnLmNqcycsXG4gICAgICAgIH0sXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAgICAgJ34vbGliL3V0aWxzL2NuJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL2xpYi91dGlscy9jbi50cycpLFxuICAgICAgICAgICAgICAgICd+L2NvbXBvc2FibGVzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL2NvbXBvc2FibGVzJyksXG4gICAgICAgICAgICAgICAgJ34nOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vJyksXG4gICAgICAgICAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgdGl0bGU6ICdDb2R5IEJvbnRlY291JyxcbiAgICBkZXNjcmlwdGlvbjogJ1BlcnNvbmFsIGJsb2cgYW5kIHBvcnRmb2xpbycsXG5cbiAgICAvLyBTaXRlIGNvbmZpZ1xuICAgIGNsZWFuVXJsczogdHJ1ZSxcbiAgICBsYXN0VXBkYXRlZDogdHJ1ZSxcbiAgICBpZ25vcmVEZWFkTGlua3M6IHRydWUsXG5cbiAgICAvLyBUaGVtZSBjb25maWdcbiAgICB0aGVtZUNvbmZpZzoge1xuICAgICAgICBuYXY6IFtcbiAgICAgICAgICAgIHsgdGV4dDogJ0hvbWUnLCBsaW5rOiAnLycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0Jsb2cnLCBsaW5rOiAnL2Jsb2cnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdBYm91dCcsIGxpbms6ICcvYWJvdXQnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdQcm9qZWN0cycsIGxpbms6ICcvcHJvamVjdHMnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdUYWxrcycsIGxpbms6ICcvdGFsa3MnIH0sXG4gICAgICAgIF0sXG5cbiAgICAgICAgc29jaWFsTGlua3M6IFtcbiAgICAgICAgICAgIHsgaWNvbjogJ2dpdGh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vY29keWJvbnRlY291JyB9LFxuICAgICAgICBdLFxuXG4gICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgbWVzc2FnZTogJ0J1aWx0IHdpdGggVml0ZVByZXNzJyxcbiAgICAgICAgICAgIGNvcHlyaWdodDogJ0NvcHlyaWdodCBcdTAwQTkgMjAyNSBDb2R5IEJvbnRlY291JyxcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gQnVpbGQgY29uZmlnIGZvciBzdGF0aWMgZ2VuZXJhdGlvblxuICAgIG91dERpcjogJ2Rpc3QnLFxuICAgIGJhc2U6ICcvJyxcblxuICAgIC8vIE1hcmtkb3duIGNvbmZpZ1xuICAgIG1hcmtkb3duOiB7XG4gICAgICAgIHRoZW1lOiAnZ2l0aHViLWRhcmsnLFxuICAgICAgICBsaW5lTnVtYmVyczogZmFsc2UsXG4gICAgICAgIGFuY2hvcjoge1xuICAgICAgICAgICAgcGVybWFsaW5rOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gSGVhZCBjb25maWcgZm9yIFNFT1xuICAgIGhlYWQ6IFtcbiAgICAgICAgWydsaW5rJywgeyByZWw6ICdpY29uJywgaHJlZjogJy9mYXZpY29uLmljbycgfV0sXG4gICAgICAgIFtcbiAgICAgICAgICAgICdsaW5rJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZWw6ICdpY29uJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgICAgICBzaXplczogJzE2eDE2JyxcbiAgICAgICAgICAgICAgICBocmVmOiAnL2Zhdmljb24tMTZ4MTYucG5nJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgICdsaW5rJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZWw6ICdpY29uJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgICAgICBzaXplczogJzMyeDMyJyxcbiAgICAgICAgICAgICAgICBocmVmOiAnL2Zhdmljb24tMzJ4MzIucG5nJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgICdsaW5rJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZWw6ICdhcHBsZS10b3VjaC1pY29uJyxcbiAgICAgICAgICAgICAgICBzaXplczogJzE4MHgxODAnLFxuICAgICAgICAgICAgICAgIGhyZWY6ICcvYXBwbGUtdG91Y2gtaWNvbi5wbmcnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAgJ2xpbmsnLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlbDogJ2FsdGVybmF0ZScsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2FwcGxpY2F0aW9uL3Jzcyt4bWwnLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnQ29keSBCb250ZWNvdSBSU1MgRmVlZCcsXG4gICAgICAgICAgICAgICAgaHJlZjogJy9yc3MueG1sJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgXSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZSLFNBQVMsb0JBQW9CO0FBQzFULE9BQU8sVUFBVTtBQURqQixJQUFNLG1DQUFtQztBQUd6QyxJQUFPLGlCQUFRLGFBQWE7QUFBQSxFQUN4QixZQUFZLENBQUMsbUJBQW1CLG9CQUFvQjtBQUFBLEVBQ3BELE1BQU07QUFBQSxJQUNGLEtBQUs7QUFBQSxNQUNELFNBQVM7QUFBQSxJQUNiO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDTCxPQUFPO0FBQUEsUUFDSCxrQkFBa0IsS0FBSyxRQUFRLGtDQUFXLG9CQUFvQjtBQUFBLFFBQzlELGlCQUFpQixLQUFLLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsUUFDekQsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLFFBQ2xDLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUN0QztBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQSxPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUE7QUFBQSxFQUdiLFdBQVc7QUFBQSxFQUNYLGFBQWE7QUFBQSxFQUNiLGlCQUFpQjtBQUFBO0FBQUEsRUFHakIsYUFBYTtBQUFBLElBQ1QsS0FBSztBQUFBLE1BQ0QsRUFBRSxNQUFNLFFBQVEsTUFBTSxJQUFJO0FBQUEsTUFDMUIsRUFBRSxNQUFNLFFBQVEsTUFBTSxRQUFRO0FBQUEsTUFDOUIsRUFBRSxNQUFNLFNBQVMsTUFBTSxTQUFTO0FBQUEsTUFDaEMsRUFBRSxNQUFNLFlBQVksTUFBTSxZQUFZO0FBQUEsTUFDdEMsRUFBRSxNQUFNLFNBQVMsTUFBTSxTQUFTO0FBQUEsSUFDcEM7QUFBQSxJQUVBLGFBQWE7QUFBQSxNQUNULEVBQUUsTUFBTSxVQUFVLE1BQU0sa0NBQWtDO0FBQUEsSUFDOUQ7QUFBQSxJQUVBLFFBQVE7QUFBQSxNQUNKLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxJQUNmO0FBQUEsRUFDSjtBQUFBO0FBQUEsRUFHQSxRQUFRO0FBQUEsRUFDUixNQUFNO0FBQUE7QUFBQSxFQUdOLFVBQVU7QUFBQSxJQUNOLE9BQU87QUFBQSxJQUNQLGFBQWE7QUFBQSxJQUNiLFFBQVE7QUFBQSxNQUNKLFdBQVc7QUFBQSxJQUNmO0FBQUEsRUFDSjtBQUFBO0FBQUEsRUFHQSxNQUFNO0FBQUEsSUFDRixDQUFDLFFBQVEsRUFBRSxLQUFLLFFBQVEsTUFBTSxlQUFlLENBQUM7QUFBQSxJQUM5QztBQUFBLE1BQ0k7QUFBQSxNQUNBO0FBQUEsUUFDSSxLQUFLO0FBQUEsUUFDTCxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDVjtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsTUFDSTtBQUFBLE1BQ0E7QUFBQSxRQUNJLEtBQUs7QUFBQSxRQUNMLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxNQUNWO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxNQUNJO0FBQUEsTUFDQTtBQUFBLFFBQ0ksS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLE1BQ1Y7QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLE1BQ0k7QUFBQSxNQUNBO0FBQUEsUUFDSSxLQUFLO0FBQUEsUUFDTCxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDVjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
