import { Selector } from 'testcafe';

class CourseTab{
    constructor(text) {
        this.name = text;
        this.label = Selector('.MuiTab-root')
        .child('.MuiTab-wrapper')
        .withText(text);
    }
}

class StatItem{
    constructor(text) {
        this.name = text;
        this.label = Selector('[class*="cardHeaderStats"]')
        .withText(text);
    }
}

class Page {
    constructor () {
        this.combinedTab = new CourseTab('COMBINED');

        this.courseTabs = [
            new CourseTab('LUTTRELLSTOWN CASTLE (MAIN)'),
            new CourseTab('LUTTRELLSTOWN CASTLE (14 HOLE WINTER)')
        ]

        this.allHolesStats = [
            new StatItem('Rounds\nPlayed'),
            new StatItem('Best\nHole'),
            new StatItem('Worst\nHole'),
            new StatItem('Best\nRound'),
            new StatItem('Worst\nRound')
        ]
    }
}

export default new Page();