class ResultsCollector {
    startNewReport() {
        this.report = {}
    }

    addTestResult(toolName, testName, failed, url, reason) {
        if (this.report[toolName] === undefined) {
            this.report[toolName] = {
                'failure': 0,
                'time': 0,
                'tests': 0,
                'testcases': []
            };
        }
        this.report[toolName]['tests']++;
        let testcase = {
            'name': testName,
        };

        if (failed) {
            this.report[toolName]['failure']++;
            testcase['reason'] = reason;
        }
        this.report[toolName]['testcases'].push(testcase);
    }
}

module.exports = new ResultsCollector();

/**
 * <testsuite tests="3">
 <testcase classname="foo1" name="ASuccessfulTest"/>
 <testcase classname="foo2" name="AnotherSuccessfulTest"/>
 <testcase classname="foo3" name="AFailingTest">
 <failure type="NotEnoughFoo"> details about failure </failure>
 </testcase>
 </testsuite>
 */
