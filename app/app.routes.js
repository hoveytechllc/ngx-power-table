"use strict";
var router_1 = require('@angular/router');
var BasicUsage_component_1 = require('./BasicUsage/BasicUsage.component');
var Sorting_component_1 = require('./Sorting/Sorting.component');
var appRoutes = [
    { path: '', component: BasicUsage_component_1.BasicUsageComponent },
    { path: 'sorting', component: Sorting_component_1.SortingComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map