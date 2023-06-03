//Pre-final Revision Version
PennController.ResetPrefix(null);
//DebugOff()
PennController.Sequence("intro", "counter", "demographic", "instructions", "practiceBeginningScreen", "SeperatorScreen_1", "exercise", "SeperatorScreen_2", "experiment", "send_results", "participant_observations", "end_of_exp");
//const voucher = b64_md5((Date.now() + Math.random()).toString()); // Voucher code generator
//Set Participant Counter
SetCounter("counter","inc", 1);
//Set up Intro
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
    newText("proceed_text", "Press the <b>Space Bar</b> on the Next Screen to Reveal the Next Keyword")
        .print()
        .center()
    ,
    newKey("key_3", " ")
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
        //NOTICE: We need to somehow make the question appear in the Center Everyime and Fix CSS
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
    newText("endOfExerciseText1", "<p>You have reached the end of Practice. On to the real experiment! As a reminder, press <b>z</b> if the answer is yes and <b>m</b> if the answer is no.</p>")
        .print()
        .center()
    ,
    newText("endOfExerciseText2", "<p>Press any key to begin.</p>")
        .print()
    ,
    newKey("key_4", " ")
        .wait()
    ,
    getText("endOfExerciseText1")
        .remove()
    ,
    getText("endOfExerciseText2")
        .remove()
);

//Running the Experiment - basically copy the code from practice once I get it to work 
Template("experiment_questions.csv", row =>
  newTrial("experiment",
        newTimer("timer_2", 500)
            .start()
            .wait()
        ,
        newController("DashedSentence", {s : row.Sentence})
            .settings.css("font-size","1.1em")
            .print()
            .log()
            .wait()
            .remove()
        ,
        //NOTICE: We need to somehow make the question appear in the Center Everyime and fix CSS
        newText("Question_2", row.Question)
            .css("font-size", "20px")
        ,
        newButton("Yes_Button_2", "Yes")
            .css("font-size", "16px")
        ,
        newButton("No_Button_2", "No")
            .css("font-size", "16px")
        ,
        newCanvas("canvas_2", 500, 100)
            .add( 0, 0, getText("Question_2").print().css("font-size", "20px"))
            .add( 50, 50, getButton("Yes_Button_2").print().css("font-size", "16px"))
            .add( 350, 50, getButton("No_Button_2").print().css("font-size", "16px"))
            .print()
            .center()
        ,
        newSelector("buttons_2")
            .add( getButton("Yes_Button_2") , getButton("No_Button_2") )
            .keys("Z","M")
            .wait()
            .log()
            .once()
            .remove()
        ,
        getCanvas("canvas_2")
            .remove())
    //Loggin Important Information
    .log( "Type", row.Type)
    .log( "List" , row.Group)
);


//Sending Results
PennController.SendResults("send_results").setOption("countsForProgressBar",false);

//Collecting Participant Observations prior to end the Experiment
PennController("participant_observations",
    //NOTICE: need to make sure it's logging the participant feedback
    newHtml("participant_observations", "participant_observations.html")
        .settings.log()
        .print()
    ,
    newText("continue_text", "→ Click here to continue")
        .css("color", "blue")
        .print()
    ,
    newSelector("text_Selector")
            .add(getText("continue_text"))
            .wait()
            .log() //NOTICE: Need confirmation for this log from Prasad
            .once()
            .remove()
);
//Ending the Experiment and Collecting Feedback
newTrial("end_of_exp",
    //Notice: Make sure the feedback is logged
    newHtml("end_of_exp", "end_of_exp.html")
        .settings.log()
        .print()
    ,
    newButton().wait(getHtml("end_of_exp").test.complete()
            .failure(getHtml("end_of_exp").warn()))
    /*    
    ,
    newButton.wait(
        getHtml("end_of_exp").test.complete()
            .failure(getHtml("end_of_exp").warn()))
            */
).setOption("countsForProgressBar",false);

