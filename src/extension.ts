/*
 * @Author: zyg0121 zhouyiguo2012@qq.com
 * @Date: 2024-11-18 02:26:56
 * @LastEditors: zyg0121 zhouyiguo2012@qq.com
 * @LastEditTime: 2024-11-18 02:29:59
 * @FilePath: \vsagilenew\src\extension.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by yiguo, All Rights Reserved. 
 */
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('myExtension.openWebview', () => {
      const panel = vscode.window.createWebviewPanel(
        'myWebview',
        'My Webview',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, 'media', 'dist'))
          ],
        }
      );

      const filePath = path.join(context.extensionPath, 'media', 'dist', 'index.html');
      let html = fs.readFileSync(filePath, 'utf8');

      // 替换 HTML 中的相对路径为 Webview 可识别的路径
      html = html.replace(
        /src="([^"]*)"/g,
        (match, src) => `src="${panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'media', 'dist', src)))}"`
      );

      html = html.replace(
        /href="([^"]*)"/g,
        (match, href) => `href="${panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'media', 'dist', href)))}"`
      );

      panel.webview.html = html;
    })
  );
}

export function deactivate() {}
