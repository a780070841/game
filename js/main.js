/**
 * Created by wt-01 on 2017/5/27.
 */

//数独大小
var size = 9;
//数独内容
var sudokuContext;

var sudokuInitString = "214356978589427361376891542642973185197285634835164729453612897921738456768549213";

var itemsBlock = {};

var clickID = "";

var clickItem = 0;
var clickDiv;

$(document).ready(function () {
    init();
    paint();
    itemsBlockObj.initItemsBlock(size);
    var a = itemsBlockObj.getItemsBlock(5, 1);
    console.log(a);

});

//绘制九宫格
var paint = function () {

    var gameDiv = $("#games");
    var numberDiv = $('#number>.center');
    numberDiv.css("display", "none");
    for (var i = 0; i < size; i++) {
        var rowDiv = $("<div class='row'></div>");
        var itemsDiv = $("<div class='items'></div>");
        for (var j = 0; j < size; j++) {

            var id = "i_" + i + "_" + j;
            var itemDiv = $("<div class='item text_number'>" + (sudokuContext[i][j] == 0 ? "&nbsp;" : sudokuContext[i][j]) + "</div>");

            if (j == 3 || j == 6) {
                itemDiv.addClass("item-left-divide");
            }
            if (i == 3 || i == 6) {
                itemDiv.addClass("item-top-divide");
            }

            if (j == size - 1) {
                itemDiv.addClass("right-border");
            }

            if (i == size - 1) {
                itemDiv.addClass("bottom-border")
            }

            itemDiv.attr("id", id);

            if (sudokuContext[i][j] == 0) {

                itemDiv.click(function (e) {
                    var id = e.target.id;
                    console.log(this.getAttribute("id"));
                    numberDiv.css("display", "block");


                    var xy = id.split("_");
                    clickID = id;
                    clickIndex = [xy[1], xy[2]];

                    for (var i = 0; i < sudokuContext.length; i++) {
                        for (var j = 0; j < sudokuContext[i].length; j++) {
                            if (!$("#i_" + i + "_" + j).hasClass("initNumber"))
                                $("#i_" + i + "_" + j).css("background-color", "white");
                        }
                    }

                    $(this).css("background-color", "green");
                    makeCheck();
                    clickItem = 1;
                });

            } else {
                itemDiv.addClass("initNumber")
            }

            itemDiv.mouseenter(function () {


            });

            itemsDiv.append(itemDiv);
        }
        rowDiv.append(itemsDiv);
        gameDiv.append(rowDiv);

        var numberItem = $("<div class='numberItem'><div class='text_number'>" + (i + 1) + "</div></div>");
        numberDiv.append(numberItem);


    }

    var deleteItem = $("<div class='numberItem'><div class='text_number'>Del</div></div>");
    deleteItem.css("background-color", "red");
    deleteItem.click(function () {
        $("#" + clickID).html("&nbsp;");
        sudokuContext[clickIndex[0]][clickIndex[1]] = 0;
        makeCheck();
    });
    numberDiv.append(deleteItem);

};

var numberClick = function (e) {
    $("#" + clickID).text(e.target.innerHTML);
    sudokuContext[clickIndex[0]][clickIndex[1]] = e.target.innerHTML;
    console.log("2222222222222");
    //makeCheck();
    var thisDiv = $(this);

    thisDiv.css("background-color", "gray");
    thisDiv.unbind();
    if (clickItem == 0) {
        clickDiv.css("background-color", "white");
        clickDiv.click(numberClick);
    }
    clickItem = 0;

    clickDiv = thisDiv;

};


//初始化方法
var init = function () {
    calculateNumbers(size);
};

var calculateNumbers = function (s) {
    if (isNaN(s)) {
        return;
    }
    var list = sudokuInitString.split("");

    var n = 0;
    //初始化数独
    sudokuContext = new Array();
    for (var i = 0; i < s; i++) {
        sudokuContext[i] = new Array();
        for (var j = 0; j < s; j++) {
            sudokuContext[i][j] = list[n];
            n++;
        }
    }
    randomSwitch();

    makePrompt(25);

};

var makePrompt = function (s) {
    var prompts = [];
    s = 81 - s;
    while (s > 0) {
        var prompt_0 = parseInt(Math.random() * 9);
        var prompt_1 = parseInt(Math.random() * 9);
        var isIn = false;
        for (var i = 0; i < prompts.length; i++) {
            if (prompts[i][0] == prompt_0 && prompts[i][1] == prompt_1) {
                isIn = true;
                break;
            }
        }
        if (!isIn) {
            prompts.push([prompt_0, prompt_1]);

            sudokuContext[prompt_0][prompt_1] = 0;
            s--;
        }
    }
};

var randomSwitch = function () {

    for (var i = 0; i <= 60; i++) {
        var switchType = parseInt(Math.random() * 6);
        var switchType_1 = parseInt(Math.random() * 3);

        var switchList = [];

        switch (switchType_1) {
            case 0:
                switchList = [1, 2];
                break;
            case 1:
                switchList = [0, 2];
                break;
            case 2:
                switchList = [0, 1];
                break;
            default :
                break;
        }

        if (switchType < 3) {
            var tmp = sudokuContext[switchType * 3 + switchList[0]];
            sudokuContext[switchType * 3 + switchList[0]] = sudokuContext[switchType * 3 + switchList[1]];
            sudokuContext[switchType * 3 + switchList[1]] = tmp;
        } else {
            var s = sudokuContext.length;
            var s1 = (switchType - 3) * 3 + switchList[0];
            var s2 = (switchType - 3) * 3 + switchList[1];
            for (var j = 0; j < s; j++) {
                var tmp = sudokuContext[j][s1];
                sudokuContext[j][s1] = sudokuContext[j][s2];
                sudokuContext[j][s2] = tmp;
            }
        }
    }

    for (var i = 0; i < 10; i++) {
        var switchNum = 0;
        var switchNum_0 = 0;
        var switchNum_1 = 0;
        while (switchNum_0 == switchNum_1 || switchNum_0 == 0 || switchNum_1 == 0) {
            switchNum = parseInt(Math.random() * 89 + 11);
            switchNum_0 = switchNum % 10;
            switchNum_1 = parseInt(switchNum / 10);
        }

        for (var k = 0; k < s; k++) {
            for (var j = 0; j < s; j++) {
                if (sudokuContext[k][j] == switchNum_0) {
                    sudokuContext[k][j] = switchNum_1;
                } else if (sudokuContext[k][j] == switchNum_1) {
                    sudokuContext[k][j] = switchNum_0;
                }
            }
        }

    }
};


var makeCheck = function () {
    itemsBlockObj.itemsBlockIndex = itemsBlockObj.getItemsBlock(clickIndex[0], clickIndex[1]);
    for (var s = 1; s <= size; s++) {

        var numberItemDiv = $("#number .text_number:contains('" + s + "')");
        if (!check(clickIndex[0], clickIndex[1], s)) {

            numberItemDiv.unbind();
            numberItemDiv.css("background-color", "gray");
        } else {
            numberItemDiv.click(numberClick);
            numberItemDiv.css("background-color", "white");
        }
    }
};

var check = function (i, j, s) {
    for (var k = 0; k < size; k++) {
        if (sudokuContext[i][k] == s) {
            return false;
        }
        if (sudokuContext[k][j] == s) {
            return false;
        }
    }
    if (!itemsBlockObj.checkBlock(i, j, s)) {
        return false;
    }
    return true;

};

var itemsBlockObj = {

    //itemsBlock index
    itemsBlockIndex: 0,

    //根据坐标获取区块
    getItemsBlock: function (i, j) {

        for (var k = 0; k < itemsBlock.length; k++) {
            var s = itemsBlock[k];
            for (var m = 0; m < s.length; m++) {
                if (s[m][0] == i && s[m][1] == j) {
                    return k;
                }
            }
        }
    },
    //组装块
    initItemsBlock: function (s) {
        itemsBlock = new Array();

        var sqrtSize = Math.sqrt(s);
        //size开平方不为整数
        if (sqrtSize % 1 > 0.0001) {
            return;
        }

        var n = -1;
        for (var i = 0; i < s; i += sqrtSize) {
            for (var j = 0; j < s; j++) {

                if (j % sqrtSize == 0) {
                    n++;
                    itemsBlock[n] = new Array();
                }
                for (var k = i; k < i + sqrtSize; k++) {
                    itemsBlock[n].push([k, j])
                }

            }
        }

        console.log(itemsBlock);
    },

    checkBlock: function (i, j, sudokuNumber) {
        var block = itemsBlock[this.itemsBlockIndex];
        for (var s = 0; s < block.length; s++) {

            if (sudokuNumber == sudokuContext[block[s][0]][block[s][1]] && (i != block[s][0] || j != block[s][1])) {
                return false;
            }
        }
        return true;
    }
};

