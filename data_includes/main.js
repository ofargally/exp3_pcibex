PennController.ResetPrefix(null);
//DebugOff()
PennController.Sequence("intro", "demographic", "instructions", "practiceBeginningScreen", "SeperatorScreen_1", "exercise");
//Set up Intro
//SetCounter("counter","inc", 1);
PennController("intro",
    newHtml("intro", "intro.html")
        .settings.log()
        .print()
    ,

    newButton("continue", "Continue")
        .settings.css("font-size", "larger")
        .print()
        .wait(
            getHtml("intro").test.complete()
                .failure(getHtml("intro").warn())
        )
);
//Set up questions about demographic.
PennController("demographic",
    newHtml("demographics", "demographic.html")
        .settings.log()
        .print()
    ,
    newButton("continue", "Continue")
        .settings.css("font-size", "larger")
        .print()
        .wait(
            getHtml("demographics").test.complete()
                .failure( getHtml("demographics").warn() )
        )
);
//Set up instructions
PennController("instructions",
    newHtml("instructions", "instructions.html")
        .settings.log()
        .print()
    ,
    newKey("key_1", "")
        .wait(
            getHtml("instructions").test.complete()
                .failure( getHtml("instructions").warn() )
        )
);
//Set up Beginning of Practice
PennController("practiceBeginningScreen", 
    newHtml("practiceBeginningScreen", "begin_of_practice.html")
        .settings.log()
        .print()
    ,
    newKey("key_2", "")
        .wait(
            getHtml("practiceBeginningScreen").test.complete()
                .failure( getHtml("practiceBeginningScreen").warn() )
        )
);
//Set up Seperator Screen
newTrial("SeperatorScreen_1",
    newText("proceed_text", "Press the Space Bar on the Next Screen to Reveal the Next Keyword")
        .print()
        .center()
    ,
    newKey("key_3", " ")
        .log()
        .wait()
    ,
    getText("proceed_text")
        .remove()
);
Template("exercise.csv", row =>
  newTrial("exercise",
        newTimer("timer_1", 500)
            .start()
            .wait()
        ,
        newController("DashedSentence", {s : row.Sentence})
            .settings.css("font-size","1.1em")
            .print()
            .log() //Time participant takes to go through the Dashed Sentence
            .wait()
            .remove()
        ,
        newText("Question", row.Question)
            .css("font-size", "20px")
        ,
        newButton("Yes_Button_1", "Yes")
            .css("font-size", "16px")
        ,
        newButton("No_Button_1", "No")
            .css("font-size", "16px")
        ,
        newCanvas("canvas", 500, 100)
            .add( 0, 0, getText("Question").print().css("font-size", "20px"))
            .add( 50, 50, getButton("Yes_Button_1").print().css("font-size", "16px"))
            .add( 350, 50, getButton("No_Button_1").print().css("font-size", "16px"))
            .print()
            .center()
        ,
        newSelector("buttons_1")
            .add( getButton("Yes_Button_1") , getButton("No_Button_1") )
            .keys("Z","M")
            .wait()
            .log()
            .once()
            .remove()
        ,
        getCanvas("canvas")
            .remove())
    //Loggin Important Information
    .log( "Type", row.Type)
    .log( "List" , row.Group)
);

newTrial("SeperatorScreen_2",
    newText("You have reached the end of Practice. On to the real experiment!....")
        .print()
        .center()
    ,
    newKey("key_3", " ")
        .log()
        .wait()
    ,
    getText("proceed_text")
        .remove()
);

//Running the Experiment - basically copy the code from practice once I get it to work 
//Template("experiment_questions.csv", row =>


//Ending the Experiment - just attach tthe HTML files for participant_observations and end_of_exp
//newTrial("end")

//Sending Results
//PennController.SendResults("send_results");