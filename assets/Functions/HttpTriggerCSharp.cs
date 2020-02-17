using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using System.Linq;
using System.Net;
using Microsoft.Azure.Devices;

namespace TestChip
{
    public static class HttpTriggerCSharp
    {
          static readonly string connectionString = Environment.GetEnvironmentVariable("iotHubConnectionString");
        static readonly RegistryManager registryManager = RegistryManager.CreateFromConnectionString(connectionString);

        // TODO
        static readonly string deviceName = "MXCHIP";

        [FunctionName("devkit-state")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            IActionResult response;

            switch (GetQueryValue(req, "action"))
            {
                case "get":
                    var callback = GetQueryValue(req, "callback");

                    if (string.IsNullOrEmpty(callback))
                    {
                        callback = "callback";
                    }

                    var twin = await registryManager.GetTwinAsync(deviceName);
                    var json = JsonConvert.SerializeObject(twin.Properties);

                    response = new ContentResult
                    {
                        Content = callback + "(" + json + ");",
                        ContentType = "application/javascript",                    
                        StatusCode = (int)HttpStatusCode.OK,
                    };

                    break;

                case "set":
                    var key = GetQueryValue(req, "key");
                    var state = GetQueryValue(req, "state");

                    await SetDeviceTwin(state, key);

                    response = new OkResult();
                    break;

                default:
                    response = new BadRequestResult();
                    break;
            }

            return response;
        }

        static string GetQueryValue(HttpRequest req, string key) => req.Query.FirstOrDefault(q => string.Compare(q.Key, key, true) == 0).Value;

        static async Task SetDeviceTwin(string state, string key)
        {
            var twin = await registryManager.GetTwinAsync(deviceName);

            switch (key)
            {
                case "userLED":
                    await UpdateUserLedState(state, twin);
                    break;
                case "rgbLED":
                    await UpdateRgbLedState(state, twin);
                    break;
                case "rgbLEDColor":
                    await UpdateRgbLedColor(state, twin);
                    break;
            }
        }

        static async Task UpdateUserLedState(string state, Microsoft.Azure.Devices.Shared.Twin twin)
        {
            if (int.TryParse(state, out var userLedState))
            {
                var patch = new
                {
                    properties = new
                    {
                        desired = new
                        {
                            userLEDState = userLedState
                        }
                    }
                };
                await registryManager.UpdateTwinAsync(twin.DeviceId, JsonConvert.SerializeObject(patch), twin.ETag);
            }
        }

        static async Task UpdateRgbLedState(string state, Microsoft.Azure.Devices.Shared.Twin twin)
        {
            if (int.TryParse(state, out var rgbLedState))
            {
                var patch = new
                {
                    properties = new
                    {
                        desired = new
                        {
                            rgbLEDState = rgbLedState
                        }
                    }
                };
                await registryManager.UpdateTwinAsync(twin.DeviceId, JsonConvert.SerializeObject(patch), twin.ETag);
            }
        }

        static async Task UpdateRgbLedColor(string state, Microsoft.Azure.Devices.Shared.Twin twin)
        {
            // TODO : il y a deux choses à modifier dans cette méthode
            var color = Regex.Split(state, ",");
            var parsedR = int.TryParse(color[0], out var r);
            var parsedG = int.TryParse(color[1], out var g);
            var parsedB = int.TryParse(color[2], out var b);

            if (parsedR)
            {
                var patch = new
                {
                    properties = new
                    {
                        desired = new
                        {
                            rgbLEDR = r,
                            rgbLEDG = g,
                            rgbLEDB = b,
                        }
                    }
                };
                await registryManager.UpdateTwinAsync(twin.DeviceId, JsonConvert.SerializeObject(patch), twin.ETag);
            }
        }
    }
    
}
