import { Selector } from 'testcafe';

import page from './pages/AllHolesPage'

fixture `Test default Data`
    .page `http://localhost:3000`;

test('Test All Tabs Rendered', async t => {

    await t.expect(page.combinedTab.label.exists).ok();

    for (const courseTab of page.courseTabs) {
        await t.expect(courseTab.label.exists).ok();
    }

})

test('Test Stats Rendered', async t => {

    for (const courseTab of page.courseTabs) {

        await t.click(courseTab.label.parent());
        
        for ( const stat of page.allHolesStats) {
            await t.expect(stat.label.exists).ok(`Stat: ${stat.name}, not rendered on course: ${courseTab.name}.`);
        }

    }

})
