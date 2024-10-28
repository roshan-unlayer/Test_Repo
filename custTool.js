const React = window.unlayer.React
const unlayer = window.unlayer

const Viewer = () => {
  return <div>I am a custom tool.</div>
}
console.log('TOOL')

unlayer.registerTool({
  name: 'my_tool',
  label: 'My Tool',
  icon: 'fa-smile',
  supportedDisplayModes: ['web', 'email'],
  options: {},
  values: {},
  renderer: {
    Viewer, // our React Viewer
    exporters: {
      web: (values) => {
        return '<div>I am a custom tool.</div>'
      },
      email: (values) => {
        return '<div>I am a custom tool.</div>'
      },
    },
    head: {
      css: (values) => {},
      js: (values) => {},
    },
  },
})
