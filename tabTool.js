// Stupid
var emptyTemplate = _.template(`
<div style="padding: 15px; border: 2px dashed #CCC; background-color: #EEE; color: #999; text-align: center;">
    No Tabs
</div>
`);

var tabTemplate = _.template(`
  <div>
    <div class="tab">
      <% _.forEach(items, function(item,index) { %>
        <button class="tablinks <%= index === 0 ? 'active' : '' %>" onclick="openTab(this,<%= index %>)"><%= item.title %></button>
      <% }); %>
    </div>

    <% _.forEach(items, function(item,index) { %>
      <div id="<%= index %>" class="tabcontent" style=<%= index === 0 ? 'display:block!important;' : 'display:none!important;' %>
        <p><%= item.content %></p>
      </div>
    <% }); %>
  </div>
`);

unlayer.registerTool({
  name: 'tab_tool',
  label: 'Tabs',
  icon: 'fa-columns',
  supportedDisplayModes: ['web'],
  options: {
    default: {
      title: null,
    },
    menu: {
      title: 'Tab Items',
      position: 1,
      options: {
        tabItem: {
          label: 'Tab Item',
          defaultValue: {
            items: [
              {
                title: 'Tab',
                content:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
              },
            ],
          },
          widget: 'tab_editor', // Custom Property Editor
        },
      },
    },
    colors: {
      title: 'Colors',
      position: 1,
      options: {
        titleTextColor: {
          label: 'Tab Title Text Color',
          defaultValue: '#000',
          widget: 'color_picker',
        },
        contentTextColor: {
          label: 'Tab Content Text Color',
          defaultValue: '#000',
          widget: 'color_picker',
        },
        titleBackgroundColor: {
          label: 'Tab Title Background Color',
          defaultValue: '#FDFDFD',
          widget: 'color_picker',
        },
        contentBackgroundColor: {
          label: 'Tab Content Background Color',
          defaultValue: '#FDFDFD',
          widget: 'color_picker',
        },
        activeTabColor: {
          label: 'Active Tab Color',
          defaultValue: '#18B2B3',
          widget: 'color_picker',
        },
      },
    },
    fontFamily: {
      title: 'Fonts',
      position: 1,
      options: {
        tabTitleFontFamily: {
          label: 'Tab Title Font',
          defaultValue: {
            label: 'Arial',
            value: 'arial,helvetica,sans-serif',
          },
          widget: 'font_family',
        },
        tabContentFontFamily: {
          label: 'Tab Content Font',
          defaultValue: {
            label: 'Arial',
            value: 'arial,helvetica,sans-serif',
          },
          widget: 'font_family',
        },
      },
    },
  },
  values: {
    touched: false,
  },
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        // If the user has added no items yet, show empty placeholder template
        if (values.tabItem.items.length == 0) return emptyTemplate();

        return tabTemplate({ items: values.tabItem.items });
      },
    }),
    exporters: {
      web: function (values) {
        return tabTemplate({ items: values.tabItem.items });
      },
    },
    head: {
      css: function (values) {
        return `
            /* Style the tab */
            .tab {
                overflow: hidden;
                display: flex;
                background-color: ${values.titleBackgroundColor};
            }

            /* Style the buttons inside the tab */
            .tab button {
                background-color: inherit;
                float: left;
                border: none;
                outline: none;
                cursor: pointer;
                padding: 14px 16px;
                transition: 0.3s;
                font-size: 17px;
                flex: 1;
                color: ${values.titleTextColor};
                border-bottom: 2px solid #E3E3E3;
                font-family: ${values.tabTitleFontFamily.value}!important;
            }

            /* Change background color of buttons on hover */
            .tab button:hover {
                background-color: #ddd;
            }

            /* Create an active/current tablink class */
            .tab button.active {
                border-bottom: 2px solid ${values.activeTabColor};
                color: ${values.activeTabColor};
            }

            /* Style the tab content */
            .tabcontent {
                display: none;
                padding: 15px 20px;
                color: ${values.contentTextColor};
                background-color: ${values.contentBackgroundColor};
                font-family: ${values.tabContentFontFamily.value}!important;
            }

        `;
      },
      js: function (values) {
        return `function openTab(item,index) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
              tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
              tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(index).style.display = "block";
            item.classList.add("active")
          }`;
      },

var editorTemplate = _.template(`
<% _.forEach(items, function(item, index) { %>
  <div style="padding: 10px; margin: 10px 0px; background-color: #FFF; border: 1px solid #CCC;">
    <div class="blockbuilder-widget-label">
      <label>Title</label>
    </div>
    <input class="tab-title form-control" data-index="<%= index %>" type="text" value="<%= item.title %>" />

    <div class="blockbuilder-widget-label pt-2">
      <label>Content</label>
    </div>
    <input class="tab-content form-control" data-index="<%= index %>" type="text" value="<%= item.content %>" />

    <a class="delete-btn" data-index="<%= index %>" style="display: inline-block; cursor: pointer; color: red; margin-top: 10px; font-size: 12px;">
      Delete Item
    </a>
  </div>
<% }); %>

<div>
  <a class="add-btn" style="display: block; text-align: center; padding: 10px; background-color: #EEE; border: 1px solid #CCC; color: #999; cursor: pointer;">
    Add New Tab
  </a>
</div>
`);
    },
  },
});

unlayer.registerPropertyEditor({
  name: 'tab_editor',
  layout: 'bottom',
  Widget: unlayer.createWidget({
    render(value, updateValue, data) {
      return editorTemplate({ items: value.items });
    },
    mount(node, value, updateValue, data) {
      var addButton = node.querySelector('.add-btn');
      addButton.onclick = function () {
        var newItems = value.items.slice(0);
        newItems.push({
          title: 'Tab',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
        });
        updateValue({ items: newItems });
      };

      // Title Text Change
      // Look for inputs with class tab-title and attach onchange event
      node.querySelectorAll('.tab-title').forEach(function (item) {
        item.onchange = function (e) {
          // Get index of item being updated
          var itemIndex = e.target.dataset.index;
          // Get the item and update its value
          var updatedItems = value.items.map(function (item, i) {
            if (i == itemIndex) {
              return {
                title: e.target.value,
                content: item.content,
              };
            }
            return {
              title: item.title,
              content: item.content,
            };
          });
          updateValue({ items: updatedItems });
        };
      });

      // URL Change
      // Look for inputs with class tab-content and attach onchange event
      node.querySelectorAll('.tab-content').forEach(function (item) {
        item.onchange = function (e) {
          // Get index of item being updated
          var itemIndex = e.target.dataset.index;

          // Get the item and update its value
          var updatedItems = value.items.map(function (item, i) {
            if (i == itemIndex) {
              return {
                title: item.title,
                content: e.target.value,
              };
            }

            return {
              title: item.title,
              content: item.content,
            };
          });

          updateValue({ items: updatedItems });
        };
      });

      // Delete
      node.querySelectorAll('.delete-btn').forEach(function (item) {
        item.onclick = function (e) {
          // Get index of item being deleted
          var itemIndex = e.target.dataset.index;
          var updatedItems = value.items
            .map(function (item, i) {
              if (i == itemIndex) {
                return false;
              }

              return {
                title: item.title,
                content: item.content,
              };
            })
            .filter(function (item) {
              return item;
            });

          updateValue({ items: updatedItems });
        };
      });
    },
  }),
});

