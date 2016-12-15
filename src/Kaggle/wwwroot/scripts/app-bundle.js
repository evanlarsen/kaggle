var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('web-api',["require", "exports", "aurelia-framework", "aurelia-fetch-client"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1) {
    "use strict";
    let WebApi = class WebApi {
        constructor(client) {
            this.client = client;
            this.isRequesting = false;
            client.configure(config => {
                config
                    .withBaseUrl('api/')
                    .withDefaults({
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                })
                    .withInterceptor({
                    request(request) {
                        console.log(`Requesting ${request.method} ${request.url}`);
                        return request;
                    },
                    response(response) {
                        console.log(`Received ${response.status} ${response.url}`);
                        return response;
                    }
                });
            });
        }
        getLeaderboards() {
            this.isRequesting = true;
            return new Promise(resolve => {
                this.client
                    .fetch('records')
                    .then(response => {
                    response.json()
                        .then(records => {
                        resolve(records);
                        this.isRequesting = false;
                    });
                });
            });
        }
        getLeaderboard(id) {
            this.isRequesting = true;
            return new Promise(resolve => {
                this.client
                    .fetch(`leaderboard/${id}`)
                    .then(response => {
                    response.json()
                        .then(records => {
                        resolve(records);
                        this.isRequesting = false;
                    });
                });
            });
        }
        getListOfLeaderboards() {
            this.isRequesting = true;
            return new Promise(resolve => {
                this.client
                    .fetch('leaderboards')
                    .then(response => {
                    response.json()
                        .then(leaderboards => {
                        resolve(leaderboards);
                        this.isRequesting = false;
                    });
                });
            });
        }
        saveRecord(record) {
            this.isRequesting = true;
            return new Promise(resolve => {
                this.client
                    .fetch('leaderboard', { method: 'POST', body: aurelia_fetch_client_1.json(record) })
                    .then(response => {
                    response.json()
                        .then(record => {
                        resolve(record);
                        this.isRequesting = false;
                    });
                });
            });
        }
    };
    WebApi = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient])
    ], WebApi);
    exports.WebApi = WebApi;
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
define('app',["require", "exports", "aurelia-framework", "./web-api"], function (require, exports, aurelia_framework_1, web_api_1) {
    "use strict";
    let App = class App {
        constructor(api) {
            this.api = api;
        }
        configureRouter(config, router) {
            config.title = 'Leaderboards';
            config.map([
                { route: '', moduleId: 'no-selection', title: 'Select' },
                { route: 'leaderboard/:id', moduleId: 'leaderboard-detail', name: 'leaderboard' }
            ]);
            this.router = router;
        }
    };
    App = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [web_api_1.WebApi])
    ], App);
    exports.App = App;
});

define('book',["require", "exports"], function (require, exports) {
    "use strict";
    class Book {
        constructor(id, name, price) {
            this.id = id;
            this.name = name;
            this.price = price;
        }
    }
    exports.Book = Book;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('utility',["require", "exports"], function (require, exports) {
    "use strict";
    function areEqual(obj1, obj2) {
        return Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]));
    }
    exports.areEqual = areEqual;
    ;
});

define('messages',["require", "exports"], function (require, exports) {
    "use strict";
    class RecordUpdated {
        constructor(record) {
            this.record = record;
        }
    }
    exports.RecordUpdated = RecordUpdated;
    class LeaderboardViewed {
        constructor(leaderboard) {
            this.leaderboard = leaderboard;
        }
    }
    exports.LeaderboardViewed = LeaderboardViewed;
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
define('leaderboard-detail',["require", "exports", "aurelia-framework", "./web-api", "aurelia-event-aggregator", "./messages"], function (require, exports, aurelia_framework_1, web_api_1, aurelia_event_aggregator_1, messages_1) {
    "use strict";
    let LeaderboardDetail = class LeaderboardDetail {
        constructor(api, ea) {
            this.api = api;
            this.ea = ea;
        }
        activate(params, routeConfig) {
            this.routeConfig = routeConfig;
            return this.api.getLeaderboard(params.id).then(records => {
                this.records = records;
                this.routeConfig.navModel.setTitle(params.id);
                this.ea.publish(new messages_1.LeaderboardViewed(params.id));
            });
        }
        attached() {
            $('a[data-toggle=popover]').popover();
        }
    };
    LeaderboardDetail = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [web_api_1.WebApi, aurelia_event_aggregator_1.EventAggregator])
    ], LeaderboardDetail);
    exports.LeaderboardDetail = LeaderboardDetail;
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
define('leaderboard-list',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "./web-api", "./messages"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, web_api_1, messages_1) {
    "use strict";
    let LeaderboardList = class LeaderboardList {
        constructor(api, ea) {
            this.api = api;
            this.ea = ea;
            ea.subscribe(messages_1.LeaderboardViewed, msg => this.select(msg));
        }
        created() {
            this.api.getListOfLeaderboards().then(leaderboards => this.leaderboards = leaderboards);
        }
        select(leaderboard) {
            this.selectedId = leaderboard;
            return true;
        }
    };
    LeaderboardList = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [web_api_1.WebApi, aurelia_event_aggregator_1.EventAggregator])
    ], LeaderboardList);
    exports.LeaderboardList = LeaderboardList;
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
            .feature('resources');
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

define('no-selection',["require", "exports"], function (require, exports) {
    "use strict";
    class NoSelection {
        constructor() {
            this.message = "Please Select a Leaderboard.";
        }
    }
    exports.NoSelection = NoSelection;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
        config.globalResources(['./elements/loading-indicator']);
    }
    exports.configure = configure;
});

define('resources/elements/loading-indicator',["require", "exports", "nprogress", "aurelia-framework"], function (require, exports, nprogress, aurelia_framework_1) {
    "use strict";
    exports.LoadingIndicator = aurelia_framework_1.decorators(aurelia_framework_1.noView(['nprogress/nprogress.css']), aurelia_framework_1.bindable({ name: 'loading', defaultValue: false })).on(class {
        loadingChanged(newValue) {
            if (newValue) {
                nprogress.start();
            }
            else {
                nprogress.done();
            }
        }
    });
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"./styles.css\"></require>\n  <require from=\"./leaderboard-list\"></require>\n\n  <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href=\"#\">\n        <i class=\"fa fa-user\"></i>\n        <span>Leaderboard</span>\n      </a>\n    </div>\n  </nav>\n\n  <loading-indicator loading.bind=\"router.isNavigating || api.isRequesting\"></loading-indicator>\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <leaderboard-list class=\"col-md-4\"></leaderboard-list>\n      <router-view class=\"col-md-8\"></router-view>\n    </div>\n  </div>\n</template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = "body {\n  padding-top: 70px; }\n\nsection {\n  margin: 0 20px; }\n\na:focus {\n  outline: none; }\n\n.navbar-nav li.loader {\n  margin: 12px 24px 0 6px; }\n\n.no-selection {\n  margin: 20px; }\n\n.leaderboard-list {\n  overflow-y: auto;\n  border: 1px solid #ddd;\n  padding: 10px; }\n\n.panel {\n  margin: 20px; }\n\n.button-bar {\n  right: 0;\n  left: 0;\n  bottom: 0;\n  border-top: 1px solid #ddd;\n  background: white; }\n\n.button-bar > button {\n  float: right;\n  margin: 20px; }\n\nli.list-group-item {\n  list-style: none; }\n\nli.list-group-item > a {\n  text-decoration: none; }\n\nli.list-group-item.active > a {\n  color: white; }\n"; });
define('text!leaderboard-detail.html', ['module'], function(module) { module.exports = "<template>\r\n  <table class=\"table table-striped table-condensed\">\r\n    <thead>\r\n      <tr>\r\n        <td>Rank</td>\r\n        <td>Team Name</td>\r\n        <td>Number of Submissions</td>\r\n        <td>Score</td>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr repeat.for=\"record of records\">\r\n        <td>${record.rank}</td>\r\n        <td>\r\n          <a href=\"javascript:void(0);\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"${record.userNames}\">\r\n            <i class=\"fa ${record.userNames.includes(',') ? 'fa-users' : 'fa-user'}\"></i>\r\n          </a>\r\n          ${record.teamName}\r\n        </td>\r\n        <td>${record.numSubmissions}</td>\r\n        <td>${record.score}</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</template>"; });
define('text!leaderboard-list.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"leaderboard-list\">\r\n    <ul class=\"list-group\">\r\n      <li repeat.for=\"leaderboard of leaderboards\" class=\"list-group-item ${leaderboard === $parent.selectedId ? 'active' : ''}\">\r\n        <a route-href=\"route: leaderboard; params.bind: {id:leaderboard}\" click.delegate=\"$parent.select(leaderboard)\">\r\n          <h4 class=\"list-group-item-heading\">${leaderboard}</h4>\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</template>"; });
define('text!no-selection.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"no-selection text-center\">\r\n    <h2>${message}</h2>\r\n  </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map