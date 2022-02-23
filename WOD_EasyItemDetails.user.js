// ==UserScript==
// @name         Wod显示物品详情
// @namespace    https://github.com/knight000/Wod_Script
// @version      1.3
// @description  try to take over the world!
// @author       knight000
// @match        http*://*.world-of-dungeons.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=world-of-dungeons.org
// @require      https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js
// @grant        unsafeWindow
// @downloadURL  https://github.com/knight000/Wod_Script/raw/main/WOD_EasyItemDetails.user.js
// @updateURL    https://github.com/knight000/Wod_Script/raw/main/WOD_EasyItemDetails.user.js
// ==/UserScript==

var DetailsDivNotHold;
var OldItemLink;
(function () {
    'use strict';
    // 页面加载完毕后执行脚本
    window.onload = function () {
        var ItemList = $("a.item_unique,a.item_usable,a.item_unusable,a.item_later_usable");
        // 给物品链接添加属性
        for (var i = 0; i < ItemList.length; i++) {
            ItemList.eq(i).attr("onmouseover", 'window.ItemDetails_Show("' + ItemList.eq(i).attr("href") + '")');
            ItemList.eq(i).attr("onmouseout", "ItemDetails_Hide()");
        };
        // 添加显示的Div
        var ND = $("<div></div>");
        ND.attr({
            "id": "ItemDiv",
            "onmouseover": "ItemDetails_Hold()",
            "onmouseout": "ItemDetails_Hide()",
            "overflow": "auto"
        });
        ND.css({
            "padding": "15px",
            "weight": "auto",
            "height": "auto",
            "position": "absolute",
            "z-index": "999",
            "border": "1px none",
            "background": "#000000"
        });
        ND.hide();
        $("body").append(ND);
        DetailsDivNotHold = true;
    };

    /**
     * @function 显示
     */
    unsafeWindow.ItemDetails_Show = function ItemDetails_Show(ItemLink) {
        var ItemDiv = $("#ItemDiv");
        // 判断是否持续
        if (DetailsDivNotHold == true) {
            DetailsDivNotHold = false;
            if (OldItemLink != ItemLink) {
                OldItemLink = ItemLink;
                ItemDiv.html("");
                // 获取物品内容
                $.get(ItemLink, function (result) {
                    var ItemDetils = $("#details", $(result));
                    var ItemMore = $("#link", $(result));
                    $("#ItemDiv").append(ItemDetils, ItemMore);
                });
                // 获取鼠标相对于文档的坐标并将div设置到那
                var position = getMousePosition(event);
                ItemDiv.css("left", position.x - 10);
                ItemDiv.css("top", position.y - 100);
            };
            ItemDiv.show();
        };
    };

    /**
    * @function 隐藏
    */
    unsafeWindow.ItemDetails_Hide = function ItemDetails_Hide() {
        DetailsDivNotHold = true;
        setTimeout(function DivHide() {
            if (DetailsDivNotHold == true) {
                $("#ItemDiv").hide();
            }
        }, 500);
    };

    /**
     * @function 保持
     */
    unsafeWindow.ItemDetails_Hold = function ItemDetails_Hold() {
        DetailsDivNotHold = false;
    };
})();

/**
 * @function 获取鼠标相对于文档的坐标（考虑页面滚动）
 * @description 来源https://www.hangge.com/blog/cache/detail_2261.html
 * */
function getMousePosition(event) {
    var x = y = 0,
        doc = document.documentElement,
        body = document.body;
    if (!event) event = window.event;
    if (window.pageYoffset) {//pageYoffset是Netscape特有
        x = window.pageXOffset;
        y = window.pageYOffset;
    } else {
        x = (doc && doc.scrollLeft || body && body.scrollLeft || 0)
            - (doc && doc.clientLeft || body && body.clientLeft || 0);
        y = (doc && doc.scrollTop || body && body.scrollTop || 0)
            - (doc && doc.clientTop || body && body.clientTop || 0);
    }
    x += event.clientX;
    y += event.clientY;
    return { 'x': x, 'y': y };
}