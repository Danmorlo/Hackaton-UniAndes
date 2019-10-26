package com.troyandes.ceres

import android.app.Activity
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import android.bluetooth.BluetoothServerSocket
import android.bluetooth.BluetoothSocket
import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import android.view.View
import android.widget.Button
import android.widget.Toast
import java.io.IOException
import java.lang.Exception
import java.util.*

class MainActivity : AppCompatActivity() {

    var REQUEST_ENABLE_BT = 77
    var REQUEST_ENABLE_BT_2 = 78
    val bluetoothAdapter: BluetoothAdapter? = BluetoothAdapter.getDefaultAdapter()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val button = findViewById(R.id.button) as Button
        val button2 = findViewById(R.id.button2) as Button

        button.setOnClickListener(object : View.OnClickListener {
            override fun onClick(v: View) {
                if (bluetoothAdapter == null) {
                    Toast.makeText(this@MainActivity, "Bluetooth is not available", Toast.LENGTH_SHORT)
                    .show()
                }
                else{
                    if (!bluetoothAdapter.isEnabled ) {
                        val enableBtIntent = Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE)
                        startActivityForResult(enableBtIntent, REQUEST_ENABLE_BT)
                    }
                    else{
                        ConnectThread(bluetoothAdapter.getRemoteDevice("18:01:F1:4C:1E:C5")).start()
                        Toast.makeText(this@MainActivity, "Archivo recibido con exito", Toast.LENGTH_LONG).show()
                    }
                }
            }
        })
        button2.setOnClickListener(object : View.OnClickListener {
            override fun onClick(v: View) {
                if (bluetoothAdapter == null) {
                    Toast.makeText(this@MainActivity, "Bluetooth is not available", Toast.LENGTH_SHORT).show()
                }
                else{
                        val enableBtIntent = Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE).apply {
                            putExtra(BluetoothAdapter.EXTRA_DISCOVERABLE_DURATION, 300)}
                        startActivityForResult(enableBtIntent, REQUEST_ENABLE_BT_2)
                }
            }
        })
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if(requestCode==REQUEST_ENABLE_BT){
            if(resultCode== Activity.RESULT_OK || resultCode == 300){
                ConnectThread(bluetoothAdapter!!.getRemoteDevice("18:01:F1:4C:1E:C5")).start()
            }
            else{
                Toast.makeText(this@MainActivity, "The bluetooth can't turn on", Toast.LENGTH_SHORT).show()
            }
        }
        else if(requestCode==REQUEST_ENABLE_BT_2){
            if(resultCode== Activity.RESULT_OK || resultCode == 300){
                AcceptThread().start()
            }
            else{
                Toast.makeText(this@MainActivity, "The bluetooth can't turn on (Server side)", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private inner class AcceptThread : Thread() {

        var message:String? = null

        private val mmServerSocket: BluetoothServerSocket? by lazy(LazyThreadSafetyMode.NONE) {
            bluetoothAdapter?.listenUsingInsecureRfcommWithServiceRecord("Troyandes", UUID.fromString("67d21950-af0d-47b3-a93e-9add11ca19f2"))
        }

        override fun run() {
            // Keep listening until exception occurs or a socket is returned.
            var shouldLoop = true
            while (shouldLoop) {
                val socket: BluetoothSocket? = try {
                    mmServerSocket?.accept()
                } catch (e: IOException) {
                    shouldLoop = false
                    null
                }
                socket?.also {
                    manageMyConnectedSocket(it)
                    mmServerSocket?.close()
                    shouldLoop = false
                }
            }
        }

        fun manageMyConnectedSocket(socket: BluetoothSocket){

            val outputStream = socket.outputStream
            try {
                outputStream.write("{\"humidity\":0.4,\"temperature\":15,\"pH\":8}".toByteArray())
                println("Enviado")
                outputStream.flush()
                message="Mensaje enviado"
                runOnUiThread(show_toast2)
            }
            catch (e:Exception){
                message="Error: "+e.message
                runOnUiThread(show_toast2)
            }
            finally {
                outputStream.close()
            }
        }

        private val show_toast2 = Runnable {
            Toast.makeText(this@MainActivity, message, Toast.LENGTH_LONG)
                .show()
        }
    }

    private inner class ConnectThread(device: BluetoothDevice) : Thread() {

        var mensaje:String? =null

        val EXTRA_MESSAGE = "com.troyandes.ceres"

        private val mmSocket: BluetoothSocket? by lazy(LazyThreadSafetyMode.NONE) {
            device.createRfcommSocketToServiceRecord(UUID.fromString("67d21950-af0d-47b3-a93e-9add11ca19f2"))
        }

        override fun run() {
            // Cancel discovery because it otherwise slows down the connection.
            bluetoothAdapter?.cancelDiscovery()

            mmSocket?.use { socket ->
                try {
                    socket.connect()
                    manageMyConnectedSocket(socket)
                }
                catch (e:Exception ){
                    mensaje="Error: "+e.message
                    runOnUiThread(show_toast1)
                }
            }
        }

        fun manageMyConnectedSocket(socket: BluetoothSocket){
            val inputStream = socket.inputStream
            try {
                val buffer = ByteArray(1024)
                val bytes = inputStream.read(buffer)
                val incomingMessage = String(buffer, 0, bytes)
                Log.d("Mensaje Recibido",incomingMessage)
                mensaje="Mensaje Recibido"
                runOnUiThread(show_toast1)
                val intent = Intent(this@MainActivity, EnviarActivity::class.java).apply {
                    putExtra(EXTRA_MESSAGE, incomingMessage)
                }
                startActivity(intent)
            }
            catch (e:Exception){
                mensaje="Error: "+e.message
                runOnUiThread(show_toast1)
            }
            finally {
                inputStream.close()
                socket.close()
            }
        }

        private val show_toast1 = Runnable {
            Toast.makeText(this@MainActivity, mensaje, Toast.LENGTH_LONG)
                .show()
        }


    }

}
