import { onMounted } from 'vue'

export function useCopyCodeEnhancement() {
  onMounted(() => {
    // Wait for VitePress to initialize its copy functionality
    setTimeout(() => {
      // Find all copy buttons
      const copyButtons = document.querySelectorAll('div[class*="language-"] > button.copy')
      
      copyButtons.forEach(button => {
        // Remove existing VitePress event listeners by cloning the button
        const newButton = button.cloneNode(true) as HTMLButtonElement
        button.parentNode?.replaceChild(newButton, button)
        
        // Add our custom click handler
        newButton.addEventListener('click', async (e) => {
          e.preventDefault()
          e.stopPropagation()
          
          // Get the code block content
          const codeBlock = newButton.parentElement?.querySelector('pre code')
          if (!codeBlock) return
          
          // Extract text content, similar to VitePress logic
          let text = ''
          const walker = document.createTreeWalker(
            codeBlock,
            NodeFilter.SHOW_TEXT,
            null
          )
          
          let node
          while ((node = walker.nextNode())) {
            text += node.textContent
          }
          
          // Clean up shell commands (remove $ and > prefixes)
          text = text.replace(/^\$\s+/gm, '').replace(/^>\s+/gm, '')
          
          try {
            // Copy to clipboard
            await navigator.clipboard.writeText(text)
            
            // Show console message for now (toast disabled)
            console.log('Code copied to clipboard!')
            
            // Add visual feedback to button
            newButton.classList.add('copied')
            setTimeout(() => {
              newButton.classList.remove('copied')
            }, 2000)
            
          } catch (err) {
            console.error('Failed to copy text: ', err)
          }
        })
      })
    }, 100)
  })
}

function showCopyToast() {
  // Dispatch custom event for toast
  window.dispatchEvent(new CustomEvent('show-copy-toast'))
}