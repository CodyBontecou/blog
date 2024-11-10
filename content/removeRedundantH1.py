import os
import re


def process_markdown_file(filepath):
    """
    Process a markdown file to remove the first header after frontmatter if it starts with a single #.
    Returns the modified content.
    """
    with open(filepath, "r", encoding="utf-8") as file:
        content = file.read()

    # Split content into lines
    lines = content.split("\n")

    # Find frontmatter boundaries
    frontmatter_start = -1
    frontmatter_end = -1

    # Look for --- or +++ frontmatter markers
    for i, line in enumerate(lines):
        if re.match(r"^(-{3}|\+{3})$", line.strip()):
            if frontmatter_start == -1:
                frontmatter_start = i
            else:
                frontmatter_end = i
                break

    # If no frontmatter found, start from beginning
    start_index = frontmatter_end + 1 if frontmatter_end != -1 else 0

    # Find first non-empty line after frontmatter
    while start_index < len(lines) and not lines[start_index].strip():
        start_index += 1

    # Check if the line starts with a single #
    if (
        start_index < len(lines)
        and lines[start_index].strip().startswith("# ")
        and not lines[start_index].strip().startswith("## ")
    ):
        # Remove the header line
        lines.pop(start_index)
        # Remove any empty lines immediately after
        while start_index < len(lines) and not lines[start_index].strip():
            lines.pop(start_index)

    return "\n".join(lines)


def main():
    # Get all markdown files in current directory
    markdown_files = [f for f in os.listdir(".") if f.endswith((".md", ".markdown"))]

    for filename in markdown_files:
        try:
            print(f"Processing {filename}...")
            modified_content = process_markdown_file(filename)

            # Write the modified content back to the file
            with open(filename, "w", encoding="utf-8") as file:
                file.write(modified_content)

            print(f"Successfully processed {filename}")

        except Exception as e:
            print(f"Error processing {filename}: {str(e)}")


if __name__ == "__main__":
    main()
