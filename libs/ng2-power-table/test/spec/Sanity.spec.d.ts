export declare class TestParentDirective {
    constructor();
    ngOnInit(): void;
}
export declare class TestChildComponent {
    private dependency;
    constructor(dependency: TestParentDirective);
}
