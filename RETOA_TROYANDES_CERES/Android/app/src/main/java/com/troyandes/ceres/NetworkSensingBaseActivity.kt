package com.troyandes.ceres

import android.annotation.SuppressLint
import android.annotation.TargetApi
import android.content.Context
import android.os.Build
import android.view.ViewGroup
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.snackbar.Snackbar
import android.content.DialogInterface
import androidx.appcompat.app.AlertDialog
import android.net.wifi.WifiManager

@SuppressLint("Registered")
open class NetworkSensingBaseActivity : AppCompatActivity(),

    ConnectionStateMonitor.OnNetworkAvailableCallbacks {

    override fun onNegative() {

    }

    override fun onPositive() {

    }

    var connectionStateMonitor: ConnectionStateMonitor? = null
    private var viewGroup: ViewGroup? = null

    @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
    override fun onResume() {
        super.onResume()

        if (connectionStateMonitor == null)
            connectionStateMonitor = ConnectionStateMonitor(this, this)
        //Register
        connectionStateMonitor?.enable()

        // Recheck network status manually whenever activity resumes
        if (connectionStateMonitor?.hasNetworkConnection() == false) onNegative()
        else onPositive()
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
    override fun onPause() {
        connectionStateMonitor?.disable()
        connectionStateMonitor = null
        super.onPause()
    }


}