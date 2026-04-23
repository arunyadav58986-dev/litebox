package com.litebox.app;

import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.widget.Toast;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;

import java.util.Locale;

public class MainActivity extends BridgeActivity {

    private boolean isAllowedHost(String host) {
        if (host == null) return false;

        host = host.toLowerCase(Locale.ROOT);

        return host.endsWith(".short.gy")
                || host.endsWith(".github.io")
                || host.endsWith(".netlify.app")
                || host.endsWith(".me");
    }

    private boolean shouldBlock(Uri uri) {
        if (uri == null) return true;

        String scheme = uri.getScheme();
        String host = uri.getHost();

        if (scheme == null) return true;

        if (!scheme.equalsIgnoreCase("http") && !scheme.equalsIgnoreCase("https")) {
            return true;
        }

        return !isAllowedHost(host);
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        bridge.setWebViewClient(new BridgeWebViewClient(bridge) {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                boolean block = shouldBlock(request.getUrl());
                if (block) {
                    Toast.makeText(MainActivity.this, "Blocked external link", Toast.LENGTH_SHORT).show();
                }
                return block;
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                boolean block = shouldBlock(Uri.parse(url));
                if (block) {
                    Toast.makeText(MainActivity.this, "Blocked external link", Toast.LENGTH_SHORT).show();
                }
                return block;
            }
        });
    }
}
