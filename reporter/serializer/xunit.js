var xml = require('xml');

class XunitReport {
    generateFromCollector(collector) {
        let report = {
            'testsuites': []
        };

        Object.keys(collector.report).forEach((key) => {
            let testsuite = {'testsuite': [
                {
                    _attr: {
                        'name': key,
                        'time': collector.report[key].time,
                        'tests': collector.report[key].tests,
                        'failure': collector.report[key].failure
                    }
                }
            ]};
            collector.report[key].testcases.forEach((testcase) => {
                var testcaseReport = {
                    'testcase': [
                        {
                            _attr: {
                                'name': testcase.name
                            }
                        }
                    ]
                };
                if (testcase.reason !== undefined) {
                    testcaseReport['testcase'].push({
                        'failure': testcase.reason
                    });
                }
                testsuite['testsuite'].push(testcaseReport);
            });
            report['testsuites'].push(testsuite);
        });



        return xml(report,{declaration: true});
    }
}

module.exports = new XunitReport();

/**
 * <testsuite tests="3">
 <testcase classname="foo1" name="ASuccessfulTest"/>
 <testcase classname="foo2" name="AnotherSuccessfulTest"/>
 <testcase classname="foo3" name="AFailingTest">
 <failure type="NotEnoughFoo"> details about failure </failure>
 </testcase>
 </testsuite>
 */
