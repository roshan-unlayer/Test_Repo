// New Tool
// Yeah
// work
unlayer.registerTool({
  name: 'new_tool',
  label: 'New Tool',
  icon: 'fa-smile',
  supportedDisplayModes: ['web', 'email'],
  options: {
    colors: {
      // Property Group
      title: 'Colors', // Title for Property Group
      position: 1, // Position of Property Group
      options: {
        textColor: {
          // Property: textColor
          label: 'Text Color', // Label for Property
          defaultValue: '#FF0000',
          widget: 'color_picker', // Property Editor Widget: color_picker
        },
        backgroundColor: {
          // Property: backgroundColor
          label: 'Background Color', // Label for Property
          defaultValue: '#FF0000',
          widget: 'color_picker', // Property Editor Widget: color_picker
        },
      },
    },
  },
  values: {},
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        return `<div style="color: ${values.textColor}; background-color: ${values.backgroundColor};">I am a custom tool.</div>`
      },
    }),
    exporters: {
      web: function (values) {
        return `<div style="color: ${values.textColor}; background-color: ${values.backgroundColor};">I am a custom tool.</div>`
      },
      email: function (values) {
        return `<div style="color: ${values.textColor}; background-color: ${values.backgroundColor};">I am a custom tool.</div>`
      },
    },
    head: {
      css: function (values) {},
      js: function (values) {},
    },
  },
  validator(data) {
    const { defaultErrors, values } = data
    return []
  },
})

import React from 'react'

const MyColorPicker = (props) => {
  const { label, value, updateValue, data } = props

  return (
    <div>
      <input
        class="color-value"
        defaultValue={value}
        onChange={(e) => updateValue(e.target.value)}
      />
      <button class="red" onClick={() => updateValue('#f00')}>
        Red
      </button>
      <button class="green" onClick={() => updateValue('#0f0')}>
        Green
      </button>
      <button class="blue" onClick={() => updateValue('#00f')}>
        Blue
      </button>
    </div>
  )
}

unlayer.registerPropertyEditor({
  name: 'my_color_picker',
  Widget: MyColorPicker,
})
