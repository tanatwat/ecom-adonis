'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/*
|--------------------------------------------------------------------------
| Route Resource equates to this
|--------------------------------------------------------------------------
|
|  Route.get('users', 'UserController.index').as('users.index')
|  Route.post('users', 'UserController.store').as('users.store')
|  Route.get('users/create', 'UserController.create').as('users.create')
|  Route.get('users/:id', 'UserController.show').as('users.show')
|  Route.put('users/:id', 'UserController.update').as('users.update')
|  Route.patch('users/:id', 'UserController.update')uploaduploadupload
|  Route.get('users/:id/edit', 'UserController.edit').as('users.edit')
|  Route.delete('users/:id', 'UserController.destroy').as('users.destroy')
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/products/paginate', 'Admin/Product/ProductCrudController.paginate')
Route.resource('/products', 'Admin/Product/ProductCrudController').apiOnly()

Route.resource('/categories', 'Admin/CategoryController').apiOnly()
Route.resource('/brands', 'Admin/BrandController').apiOnly()

Route.get('/get/product_upload_data', 'Api/GetterController.productUpload')
