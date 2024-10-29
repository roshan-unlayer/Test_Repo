// Issue
// New
// Newer
const toolTemplate = function (values, isViewer = false) {
  return `<div class="product-card">
  <img src="${values.productImage.url}" />
  <div class="product-card-body">
    <h3 class="m-0" style="color: ${values.productTitleColor};">${
    values.productTitle
  }</h3>
    <div class="description">${values.productDescription}</div>
  </div>
  <div class="product-footer" style="background-color: ${
    values.productPriceBackgroundColor
  };">
    <div style="color: ${values.productPriceColor};">$${
    values.productPrice
  }</div>
    <a class="button no-underline no-border-radius" href="${
      values.productCTAAction.url
    }" target="${values.productCTAAction.target}" style="background-color: ${
    values.productCTAColor
  }; color: ${values.productCTATextColor};">${values.productCTA}</a>
  </div>
</div>
${isViewer ? modalTemplate({ products: values.data.products }) : ''}
`;
};

const modalTemplate = function (data) {
  return `
  <div class="modal" id="product_library_modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Products Library</h3>
          <button class="close" onclick="hideModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="search-box">
            <input type="text" class="form-control" placeholder="Search by name" id="search-bar" style="width: 78%" />
            <button id="search-btn" class="button" style="width: 20%">Search</button>
          </div>
          <div class="products-list">
            ${productItemsTemplate(data)}
          </div>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
`;
};

// const productItemsTemplate = _.template(`
// <% _.forEach(products, function(item) { %>
//   <div class="product-item" id="product-item" data-uuid='<%= item.id %>' data-title="<%= item.title %>" data-price="<%= item.price %>" data-image="<%= item.image %>" data-description="<%= item.description %>" >
//   <img src="<%= item.image %>" style="max-height: 300px;min-height: 300px;width: 100%;" />
//     <h4 style="margin: 0.5rem 0; text-align: left;"><%= item.title %></h4>
//     <h4 style="margin: 0.5rem 0; text-align: left;">$<%= item.price %></h4>
//     <p style="text-align: left;"><%= item.description %></p>
//   </div>
// <% }); %>
// `);

const productItemsTemplate = (data) => {
  if (!data || !Array.isArray(data.products)) {
    console.error("No products data available.");
    return ''; // Return an empty string or some fallback content
  }

  return data.products
    .map(
      (item) => `
      <div class="product-item" id="product-item" data-uuid="${item.id}" data-title="${item.title}" data-price="${item.price}" data-image="${item.image}" data-description="${item.description}">
        <img src="${item.image}" style="max-height: 300px;min-height: 300px;width: 100%;" />
        <h4 style="margin: 0.5rem 0; text-align: left;">${item.title}</h4>
        <h4 style="margin: 0.5rem 0; text-align: left;">$${item.price}</h4>
        <p style="text-align: left;">${item.description}</p>
      </div>
      `
    )
    .join('');
};

unlayer.registerTool({
  name: 'product_tool',
  label: 'Product',
  icon: 'fa-tag',
  supportedDisplayModes: ['web', 'email'],
  options: {
    productContent: {
      title: 'Product Content',
      position: 1,
      options: {
        productLibrary: {
          label: 'Add Product from store',
          defaultValue: '',
          widget: 'product_library',
        },
        productImage: {
          label: 'Product Image',
          defaultValue: {
            url: 'https://s3.amazonaws.com/unroll-images-production/projects%2F6553%2F1604576441796-339575',
          },
          widget: 'image',
        },
        productTitle: {
          label: 'Product Title',
          defaultValue: 'Product Title',
          widget: 'text',
        },
        productTitleColor: {
          label: 'Product Title Color',
          defaultValue: '#000000',
          widget: 'color_picker',
        },
        productDescription: {
          label: 'Product Description',
          defaultValue:
            'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
          widget: 'rich_text',
        },
        productPrice: {
          label: 'Product Price',
          defaultValue: '7.99',
          widget: 'text',
        },
        productPriceColor: {
          label: 'Product Price Color',
          defaultValue: '#000000',
          widget: 'color_picker',
        },
        productPriceBackgroundColor: {
          label: 'Product Price Background',
          defaultValue: '#ffffff',
          widget: 'color_picker',
        },
        productCTA: {
          label: 'Button Name',
          defaultValue: 'Buy Now',
          widget: 'text',
        },
        productCTAColor: {
          label: 'Button Color',
          defaultValue: '#007bff',
          widget: 'color_picker',
        },
        productCTATextColor: {
          label: 'Button Text Color',
          defaultValue: '#ffffff',
          widget: 'color_picker',
        },
        productCTAAction: {
          label: 'Action Type',
          defaultValue: {
            name: 'web',
            values: {
              href: 'http://google.com',
              target: '_blank',
            },
          },
          widget: 'link',
        },
      },
    },
  },
  transformer: (values, source) => {
    const { name, value, data } = source;
    // Transform the values here
    // We will update selected values in property editor here
    let newValues =
      name === 'productLibrary'
        ? {
            ...values,
            productTitle: value.selected.title,
            productPrice: value.selected.price,
            productDescription: value.selected.description,
            productImage: {
              url: value.selected.image,
            },
          }
        : {
            ...values,
          };

    // Return updated values
    return newValues;
  },
  values: {},
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        return toolTemplate(values, true);
      },
    }),
    exporters: {
      web: function (values) {
        return toolTemplate(values);
      },
      email: function (values) {
        return toolTemplate(values);
      },
    },
    head: {
      // As we need custom styling in export as well that's why we put those styles here
      css: function (values) {
        return `      
        .product-card {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          min-width: 0;
          word-wrap: break-word;
          background-color: #fff;
          background-clip: border-box;
          border: 1px solid rgba(0,0,0,.125);
          border-radius: .25rem;
          margin: auto;
          text-align: center;
        }

        .product-card-body {
          padding: 0 1rem 1rem;
          text-align: left;
        }

        .product-card-body h3 {
          margin: 0.7rem 0;
        }

        .product-card img {
          width: 100%;
          object-fit: contain;
          border-top-left-radius: 0.25rem;
          border-top-right-radius: 0.25rem;
        }

        .product-card .product-footer {
          display: flex;
          border-bottom-left-radius: 0.25rem;
          border-bottom-right-radius: 0.25rem;
          border-top: 1px solid rgba(0,0,0,.125);
          align-items: center;
          font-weight: bold;
        }

        .product-card .product-footer > div, .product-card .product-footer > .button{
          width: 50%;
        }

        .product-card .product-footer > div {
          border-bottom-left-radius: 0.25rem;
        }

        .product-card .product-footer > .button {
          border-bottom-right-radius: 0.25rem;
        }

        .button {
          display: inline-block;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          vertical-align: middle;
          background-color: transparent;
          border: 1px solid transparent;
          border-radius: 0.25rem;
          padding: .75rem;
          font-size: 1rem;
          line-height: 1.5;
          transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
          background-color: rgb(0, 123, 255);
          cursor: pointer;
        }

        .m-0 {
          margin: 0px;
        }

        .no-underline {
          text-decoration: none;
        }

        .no-border-radius {
          border-radius: 0px;
        }
        `;
      },
      js: function (values) {},
    },
  },
});

const editorTemplate = `<button id="addProduct" class="button">Add Product</button>`;

const showModal = function () {
  const modal = document.getElementById('product_library_modal');
  modal.classList.add('show');
};

const hideModal = function () {
  const modal = document.getElementById('product_library_modal');
  modal.classList.remove('show');
};

unlayer.registerPropertyEditor({
  name: 'product_library',
  layout: 'bottom',
  Widget: unlayer.createWidget({
    render(value, updateValue, data) {
      return editorTemplate;
    },
    mount(node, value, updateValue, data) {
      var addButton = node.querySelector('#addProduct');
      addButton.onclick = function () {
        showModal();
        setTimeout(() => {
          // We are using event bubling to capture clicked item instead of registering click event on all product items.
          var selectButton = document.querySelector('.products-list');
          if (!selectButton) return;
          selectButton.onclick = function (e) {
            if (e.target.id === 'product-item') {
              // If user clicks on product item
              // Find selected item from products list
              const selectedProduct = data.products.find(
                (item) => item.id === parseInt(e.target.dataset.uuid)
              );
              updateValue({ selected: selectedProduct });
            } else {
              // If user click on child of product item (e.g. title, price, image or desctiption)
              const parent = e.target.parentElement;
              if (parent && parent.id !== 'product-item') return;
              const selectedProduct = data.products.find(
                (item) => item.id === parseInt(parent.dataset.uuid)
              );
              updateValue({ selected: selectedProduct });
            }
            hideModal();
            // This is a hack to close property editor right bar on selecting an item from products list.
            var outerBody = document.querySelector('#u_body');
            outerBody.click();
          };
          /* Register event listeners for search */
          var searchBar = document.querySelector('#search-bar');
          var searchButton = document.querySelector('#search-btn');
          searchButton.onclick = function (e) {
            const list = document.querySelector(
              '#product_library_modal .products-list'
            );
            let filteredItem;
            let productsListHtml;
            if (list && data && data.products) {
              if (searchBar.value === '') {
                productsListHtml = productItemsTemplate({
                  products: data.products,
                });
              } else {
                filteredItem = data.products.filter((item) =>
                  item.title
                    .toLowerCase()
                    .includes(searchBar.value.toLowerCase())
                );
                productsListHtml = productItemsTemplate({
                  products: filteredItem,
                });
              }
              list.innerHTML = productsListHtml;
            }
          };
        }, 200);
      };
    },
  }),
});
