// ==UserScript==
// @name         Wod增强
// @namespace    https://github.com/knight000/Wod_Script
// @version      2.6.3
// @description  try to take over the world!
// @author       knight000
// @match        http*://*.world-of-dungeons.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=world-of-dungeons.org
// @require      https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js
// @grant        none
// @downloadURL  https://cdn.jsdelivr.net/gh/knight000/Wod_Script/Wod_Script/main/WOD_Extra.user.js
// @updateURL    https://cdn.jsdelivr.net/gh/knight000/Wod_Script/Wod_Script/main/WOD_Extra.user.js
// ==/UserScript==

(function () {
    'use strict';
    // 页面加载完毕后执行脚本
    window.onload = function () {
        // 相关模块，注释掉来取消使用
        AutoVote();
        AutoReduce();
        ReplaceLink();
    };
})();

/**
 * @function 自动投票模块
 */
function AutoVote() {
    var VoteBanner = $(".vote.banner > a");
    var VoteReward = $(".vote.reward");
    // 如果有$(".vote.banner")就表明是投票页面进行操作
    if (VoteBanner.length != 0) {
        // 移除链接，这样就不会弹出窗口了
        VoteBanner.removeAttr("href");
        for (var i = 0; i < VoteBanner.length; i++) {
            console.log("[Wod增强]正在检测投票链接" + i);
            try {
                // 把投票链接后的说明提取出来，以此判定是否已投票，正则把多余的"去除
                var VoteSpan = VoteReward[i].getElementsByTagName("span")[0].innerHTML.replace(/"/g, "");
            } catch {
                continue;
            };
            // 如果是5或者3荣誉就进行点击
            if (VoteSpan[0] == '5' || VoteSpan[0] == '3') {
                VoteBanner[i].click();
                break;
            };
        };
        console.log("[Wod增强]全部投票完毕");
    } else {
        // 非投票页面检测未投票就打开投票窗口，如果默认设置拦截弹出窗口的话就打不开了
        if ($("center:contains('点链接获5')").length != 0) {
            window.open($("a[href^='/wod/spiel/rewards/vote.php?']:last").attr("href"));
            console.log("[Wod增强]非投票页面，未投票，已跳转");
        } else {
            console.log("[Wod增强]非投票页面，已投票");
        }
    };
};

/**
 * @function 自动减少地域探索时间模块
 */
function AutoReduce() {
    var Reduce = $('[name="reduce_dungeon_time"]');
    // 有这个按钮就按一下
    if (Reduce.length != 0) {
        Reduce[0].click();
        console.log("[Wod增强]已自动减少地域时间");
    } else {
        console.log("[Wod增强]无需自动减少地域时间");
    };
};

/**
 * @function 链接替换为新窗口打开模块
 */
function ReplaceLink() {
    // 团队说明的快速链接
    $("div.gadget.groupmsg.lang-cn a[target!='_blank']").attr("target", "_blank");
    // 物品链接
    $("a.item_unique[target!='_blank']").attr("target", "_blank");
    // 拍卖详情
    $("a:contains('详情')[target!='_blank']").attr("target", "_blank");
    // 英雄详情
    $("a.hero_active,a.hero_inactive").attr("target", "_blank");
    console.log("[Wod增强]链接替换为新窗口打开");
};