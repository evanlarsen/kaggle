define('book',["require", "exports"], function (require, exports) {
    "use strict";
    class Book {
        constructor(id, name, price) {
            this.id = id;
            this.name = name;
            this.price = price;
            this.id = id;
            this.name = name;
            this.price = price;
        }
    }
    exports.Book = Book;
});

define('store',["require", "exports", "aurelia-fetch-client", "./book"], function (require, exports, aurelia_fetch_client_1, book_1) {
    "use strict";
    class Store {
        constructor() {
            this.client = new aurelia_fetch_client_1.HttpClient();
            this.client.configure(config => {
                config
                    .withBaseUrl('api/')
                    .withDefaults({
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                })
                    .withInterceptor({
                    request: (request) => {
                        console.log(`Requesting ${request.method} ${request.url}`);
                        return request;
                    },
                    response: (response) => {
                        console.log(`Received ${response.status} ${response.url}`);
                        return response;
                    }
                });
            });
        }
        getBooks() {
            return new Promise((resolve, reject) => {
                this.client.fetch('store')
                    .then(response => response.json())
                    .then(data => {
                    console.log(data);
                    resolve(convertToBooks(data));
                });
            });
        }
    }
    exports.Store = Store;
    function convertToBooks(data) {
        return data.map(book => new book_1.Book(book.Id, book.Name, book.Price));
    }
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "aurelia-framework", "./store"], function (require, exports, aurelia_framework_1, store_1) {
    "use strict";
    let App = class App {
        constructor(store) {
            this.store = store;
            this.message = 'Hello World!';
        }
        bind() {
            return this.store.getBooks().then(books => {
                this.books = books;
                console.log(books);
            });
        }
    };
    App = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [store_1.Store])
    ], App);
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        longStackTraces: environment_1.default.debug,
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources')
            .globalResources('resources/value-converters/dollars-format');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(() => aurelia.setRoot());
    }
    exports.configure = configure;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('resources/value-converters/dollars-format',["require", "exports"], function (require, exports) {
    "use strict";
    class DollarsFormatValueConverter {
        toView(value) {
            return `$${value}`;
        }
        fromView(value) {
            return value.substring(1);
        }
    }
    exports.DollarsFormatValueConverter = DollarsFormatValueConverter;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <h1>${message}</h1>\n  <div class=\"btn-group\" role=\"group\" aria-label=\"...\">\r\n    <button type=\"button\" class=\"btn btn-default\">Left</button>\r\n    <button type=\"button\" class=\"btn btn-default\">Middle</button>\r\n    <button type=\"button\" class=\"btn btn-default\">Right</button>\r\n  </div>\n\n  <table class=\"table table-striped\">\n    <tr repeat.for=\"book of books\">\n      <td>${book.name}</td>\n      <td>${book.price | dollarsFormat}</td>\n    </tr>\n  </table>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map