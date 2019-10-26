package com.troyandes.ceres

import android.os.AsyncTask
import android.os.Build
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.annotation.RequiresApi

import org.json.JSONObject
import java.io.*
import java.net.HttpURLConnection
import java.net.URL


class EnviarActivity : NetworkSensingBaseActivity() {

    val url= "https://hack-ba.herokuapp.com/api/following/"
    val EXTRA_MESSAGE = "com.troyandes.ceres"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.enviar_layout)
        var textView = findViewById(R.id.textView2) as TextView
        var button = findViewById(R.id.buttonEnviarAct) as Button
        val message = intent.getStringExtra(EXTRA_MESSAGE)
        textView.text = message
        button.setOnClickListener(
            object : View.OnClickListener {
                @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
                override fun onClick(v: View?) {
                    if (connectionStateMonitor!!.hasNetworkConnection()) {
                        var editTextHello = findViewById<EditText>(R.id.editText)
                        var editTextHello2 = findViewById<EditText>(R.id.editText2)
                        var editText = editTextHello.text.toString()
                        var editText2 = editTextHello2.text.toString()
                        val fr=JSONObject(message).accumulate("product",editText2)
                        val json = JSONObject()
                        json.put("followings", fr)
                        json.put("uid", editText)
                        json.put("utype", "CC")
                        HttpTask( {
                            if (it == null) {
                                println("connection error")
                                return@HttpTask
                            }
                        } ).execute("POST", url, json.toString())
                    } else {
                        Toast.makeText(this@EnviarActivity, "No hay conexión a internet", Toast.LENGTH_SHORT).show()
                    }
                }
            }
        )
    }


    class HttpTask(callback: (String?) -> Unit) : AsyncTask<String, Unit, String>()  {

        var callback = callback
        val TIMEOUT = 10*1000

        override fun doInBackground(vararg params: String): String? {
            val url = URL(params[1])
            val httpClient = url.openConnection() as HttpURLConnection
            httpClient.setReadTimeout(TIMEOUT)
            httpClient.setConnectTimeout(TIMEOUT)
            httpClient.requestMethod = params[0]

            if (params[0] == "POST") {
                httpClient.instanceFollowRedirects = false
                httpClient.doOutput = true
                httpClient.doInput = true
                httpClient.useCaches = false
                httpClient.setRequestProperty("Content-Type", "application/json; charset=utf-8")
            }
            try {
                if (params[0] == "POST") {
                    httpClient.connect()
                    val os = httpClient.getOutputStream()
                    val writer = BufferedWriter(OutputStreamWriter(os, "UTF-8"))
                    writer.write(params[2])
                    writer.flush()
                    writer.close()
                    os.close()
                }
                if (httpClient.responseCode == HttpURLConnection.HTTP_OK) {
                    val stream = BufferedInputStream(httpClient.inputStream)
                    val data: String = readStream(inputStream = stream)
                    return data
                } else {
                    println("ERROR ${httpClient.responseCode}")
                }
            } catch (e: Exception) {
                e.printStackTrace()
            } finally {
                httpClient.disconnect()
            }

            return null
        }

        fun readStream(inputStream: BufferedInputStream): String {
            val bufferedReader = BufferedReader(InputStreamReader(inputStream))
            val stringBuilder = StringBuilder()
            bufferedReader.forEachLine { stringBuilder.append(it) }
            return stringBuilder.toString()
        }

        override fun onPostExecute(result: String?) {
            super.onPostExecute(result)
            callback(result)
        }
    }
}

