import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: WebViewPage(),
    );
  }
}

class WebViewPage extends StatefulWidget {
  @override
  _WebViewPageState createState() => _WebViewPageState();
}

class _WebViewPageState extends State<WebViewPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Flutter InAppWebView')),
      body: InAppWebView(
        initialUrlRequest: URLRequest(url: WebUri("http://10.0.2.2:3000")),
        
        onWebViewCreated: (controller) {
          // 在這裡您可以執行更多操作
        },
        onLoadStart: (controller, url) {
          print("Started loading: $url");
        },
        onLoadStop: (controller, url) async {
          print("Stopped loading: $url");
        },
      ),
    );
  }
}
