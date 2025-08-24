const puppeteer = require('puppeteer')
const loginLink='https://www.hackerrank.com/auth/login'
// const email = 'ciwecin676@percyfx.com';
// const password = '@hackerrank';
const email = 'test.automation2708@gmail.com';
const password = '@hackerrank';
const codeObj=require('./codes');
let browserOpen=puppeteer.launch({
    headless:false,
    args:["--start-maximized"],
    defaultViewport:null
})
let page;
browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;

}).then(function(newTab){
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;
}).then(function(){
    let emailIsEntered=page.type("input[id='input-1']",email,{delay:50});
    return emailIsEntered;
}).then(function(){
    let passwordIsEntered=page.type("input[id='input-2']",password,{delay:50});
    return passwordIsEntered;
}).then(function(){
    let LoginButtonClicked=page.click("button[type='submit']",{delay:50});
    return LoginButtonClicked;
}).then(function(){
    let clickOnAlgoPromise=waitAndClick('.topic-card a[data-attr1="algorithms"]',page);
    return clickOnAlgoPromise;
}).then(function(){
    let getToWarmUp=waitAndClick('input[value="warmup"]',page);
    return getToWarmUp;
}).then(function(){
    let waitfor3seconds=page.waitFor(3000);
    return waitfor3seconds;
}).then(function(){
    let allChallengePromise=page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
    return allChallengePromise;
}).then(function(questionArr){
    let questionWillBeSolved=questionSolver(page,questionArr[0],codeObj.answer[0]);
    return questionWillBeSolved;
    
})


function waitAndClick(selector,cPage){
    return new  Promise(function(resolve,reject){
        let waitForModelPromise=cPage.waitForSelector(selector);
        waitForModelPromise.then(function(){
            let clickModel=cPage.click(selector);
            return clickModel;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject(err);
        })
    })
}

function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let questionWillBeClicked=question.click();
        questionWillBeClicked.then(function(){
            let EditorInFocusPromise=waitAndClick('.monaco-editor.no-user-select.showUnused.showDeprecated.vs',page);
            return EditorInFocusPromise;
        }).then(function(){
             return waitAndClick('.checkbox-input',page); 

        }).then(function(){
            return page.waitForSelector('textarea.custominput',page);
        }).then(function(){
            return page.type('textarea.custominput',answer,{delay:10});
        }).then(function(){
            let ctrlIsPressed=page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function(){
            let aIsPressed=page.keyboard.press('A',{delay:100});
            return aIsPressed;
        }).then(function(){
            let xIsPressed=page.keyboard.press('X',{delay:100});
            return xIsPressed;
        }).then(function(){
            let ctrlisUnpressed=page.keyboard.up('Control');
            return ctrlisUnpressed;
        }).then(function(){
            let mainEditorIsFocused=waitAndClick('.monaco-editor.no-user-select.showUnused.showDeprecated.vs',page);
            return mainEditorIsFocused;
        }).then(function(){
            let ctrlIsPressed=page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function(){
            let aIsPressed=page.keyboard.press('A',{delay:100});
            return aIsPressed;
        }).then(function(){
            let vIsPressed=page.keyboard.press('V',{delay:100});
            return vIsPressed;
        }).then(function(){
            let ctrlisUnpressed=page.keyboard.up('Control');
            return ctrlisUnpressed;
        }).then(function(){
            return page.click('.hr-monaco__run-code', {delay:50});
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}


