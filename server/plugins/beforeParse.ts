export default defineNitroPlugin(nitroApp => {
    nitroApp.hooks.hook('content:file:beforeParse', file => {
        if (file._id.endsWith('.md')) {
            // console.log(file)
        }
    })
})
