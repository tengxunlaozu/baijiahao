// ==UserScript==
// @name         屏蔽百度搜索百家号文章
// @namespace    https://github.com/tengxunlaozu/baijiahao
// @version      1.1
// @description  屏蔽百度搜索结果中的百家号文章
// @author       tengxunlaozu
// @match        *://*.baidu.com/*
// ==/UserScript==

(function() {
  'use strict';

  // 用 CSS 强制隐藏匹配到的百度结果
  const style = document.createElement('style');
  style.textContent = `
    /* 标准百家号链接 */
    a[href*="baijiahao.baidu.com"] {
      display: none !important;
    }
    /* 百家号标题 / 来源等相关 */
    div.c-container[data-tuiguang*="baijiahao"],
    div.c-container:has(a[href*="baijiahao.baidu.com"]),
    div.result.c-container:has(a[href*="baijiahao.baidu.com"]),
    div.result.c-container:has(span.c-color-red[data-tuiguang]) {
      display: none !important;
    }
  `;
  document.head.appendChild(style);

  // 隐藏已存在
  hideExistingResults();

  // 监听动态加载内容
  const observer = new MutationObserver((mutations) => {
    if (!document.body) return;
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        hideExistingResults();
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // 主动隐藏函数
  function hideExistingResults() {
    document.querySelectorAll(
      'a[href*="baijiahao.baidu.com"], ' +
      'div.c-container[data-tuiguang*="baijiahao"], ' +
      'div.c-container:has(a[href*="baijiahao.baidu.com"]), ' +
      'div.result.c-container:has(span.c-color-red[data-tuiguang])'
    ).forEach(el => {
      el.style.display = 'none';
    });
  }
})();
