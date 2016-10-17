"use strict";
var router_1 = require("@angular/router");
var Basic_component_1 = require("./Basics/Basic.component");
var Sorting_component_1 = require("./Sorting/Sorting.component");
var Paging_component_1 = require("./Paging/Paging.component");
var appRoutes = [
    { path: '', component: Basic_component_1.BasicComponent },
    { path: 'sorting', component: Sorting_component_1.SortingComponent },
    { path: 'paging', component: Paging_component_1.PagingComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map