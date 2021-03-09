var fs = require(`fs`)
var findAllDrops = require(`./commandsNoDiscord/findAllDropsPretty.js`)
//var num = 7570
var listOfItems = [20,21,2097196,80,89,16480,16488,16496,16497,16498,118,125,130,16514,131,16517,16518,16519,16520,16521,16523,16524,16525,16526,16527,16528,16529,16530,16531,16532,16533,16534,16535,16536,16537,16538,16539,16540,16541,16542,16543,16544,16545,16546,16551,16553,16565,16566,16567,16568,16569,16570,16571,16572,16573,16574,16575,16576,16577,16578,16579,16580,16581,16582,16583,16584,16585,16587,16588,16594,16595,16596,16597,16598,16599,16600,16601,16602,16603,16604,16605,16606,16607,16608,16609,16610,16611,16612,16613,16614,16615,16616,16617,16618,16619,16620,16621,16622,16623,16624,16625,16629,16632,16633,16634,16635,16636,16637,16638,16639,16640,16644,16647,16650,16651,16652,16653,16654,16656,16657,16682,16898,1272,1720,1722,1723,1725,1726,1727,1764,1879,1882,1883,1889,1890,1891,1966,2160,2196,2197,2198,2208,2209,2239,2241,2243,2246,2247,2250,2358,2508,2509,2511,2513,2514,2515,2516,2517,2519,2520,2521,2522,2523,2524,2526,2527,2586,2587,2588,2589,2615,2616,2617,2618,2619,2620,2621,2622,2623,2624,2627,2630,2631,2632,2633,2634,2635,2641,2642,2643,2644,2647,2648,2670,2843,2844,2846,2847,2848,2851,2852,2853,2854,2855,2867,2872,2942,2943,2944,2945,2946,2950,2951,2952,2953,2954,2955,2957,2958,2959,2960,2961,2962,2963,2977,2978,2979,2985,2986,2988,2989,2990,2993,2994,2995,2996,2997,2998,2999,3010,3011,3012,3013,3014,3015,3016,3038,3039,3040,3053,3063,3065,3066,3067,3071,3077,3100,3120,3121,3191,3193,3206,3227,3290,3291,3292,3293,3327,3328,3368,3390,3391,3392,3478,3479,3480,3508,3639,3654,3735,3799,3801,3825,3849,3852,3853,3855,3858,3859,3860,3861,3862,3863,3868,3869,3870,3872,3903,3906,3907,3938,3973,3981,4015,4049,4050,4051,4052,4053,4054,4055,4056,4057,4058,4059,4060,4061,4062,4063,4064,4065,4066,4067,4068,4069,4070,4071,4072,4073,4074,4075,4076,4077,4078,4079,4080,4081,4082,4083,4084,4085,4086,4087,4088,4089,4090,4091,4092,4093,4094,4095,4096,4097,4098,4099,4100,4101,4102,4103,4104,4105,4106,4107,4108,4109,4110,4111,4112,4113,4114,4115,4116,4117,4118,4119,4120,4121,4122,4123,4124,4125,4126,4127,4128,4129,4130,4131,4132,4133,4134,4135,4136,4137,4138,4139,4140,4141,4142,4143,4144,4145,4146,4147,4148,4149,4150,4151,4152,4153,4154,4155,4156,4157,4158,4159,4160,4161,4162,4163,4164,4165,4166,4167,4168,4169,4170,4171,4172,4173,4174,4175,4176,4177,4178,4179,4180,4181,4182,4183,4184,4185,4186,4187,4188,4189,4190,4191,4192,4193,4194,4195,4196,4197,4198,4199,4200,4201,4202,4203,4204,4205,4206,4207,4208,4209,4210,4211,4212,4213,4214,4215,4216,4217,4218,4219,4220,4221,4222,4223,4224,4225,4226,4227,4228,4229,4230,4231,4232,4233,4234,4235,4236,4237,4238,4239,4240,4241,4242,4243,4244,4245,4246,4247,4248,4249,4250,4251,4252,4253,4254,4255,4256,4257,4258,4259,4260,4261,4262,4263,4264,4265,4266,4267,4268,4269,4270,4271,4272,4273,4274,4275,4276,4277,4278,4279,4280,4281,4282,4283,4284,4285,4286,4287,4288,4289,4290,4291,4292,4293,4294,4295,4296,4297,4298,4299,4300,4301,4302,4303,4304,4305,4306,4307,4308,4309,4310,4311,4312,4313,4314,4315,4316,4317,4318,4319,4320,4321,4322,4323,4324,4325,4326,4327,4328,4329,4330,4331,4332,4333,4334,4335,4336,4337,4338,4339,4340,4341,4342,4343,4344,4345,4346,4347,4348,4349,4350,4351,4352,4353,4354,4355,4356,4357,4358,4359,4360,4361,4362,4363,4364,4365,4366,4367,4368,4369,4370,4371,4372,4373,4374,4375,4376,4377,4378,4379,4380,4381,4382,4383,4384,4385,4386,4387,4388,4389,4390,4391,4392,4393,4394,4395,4396,4397,4398,4399,4400,4401,4402,4403,4404,4405,4406,4407,4408,4409,4410,4411,4412,4413,4414,4415,4416,4417,4418,4419,4420,4421,4422,4423,4424,4425,4426,4427,4428,4429,4430,4431,4432,4433,4434,4435,4436,4437,4438,4439,4440,4441,4442,4443,4444,4445,4446,4447,4448,4449,4450,4451,4452,4453,4454,4455,4456,4457,4458,4459,4460,4461,4462,4463,4464,4465,4466,4467,4468,4469,4470,4471,4472,4473,4474,4475,4476,4477,4478,4479,4480,4481,4482,4483,4484,4485,4486,4487,4488,4489,4490,4491,4492,4493,4494,4495,4496,4497,4498,4499,4500,4501,4502,4503,4504,4505,4506,4507,4508,4509,4510,4511,4512,4513,4514,4515,4516,4517,4518,4519,4520,4521,4522,4523,4524,4525,4526,4527,4528,4529,4530,4531,4532,4533,4534,4535,4536,4537,4538,4539,4540,4541,4542,4543,4544,4545,4546,4547,4548,4549,4550,4551,4552,4553,4554,4555,4556,4557,4558,4559,4560,4561,4562,4563,4564,4565,4566,4567,4568,4569,4570,4571,4572,4573,4574,4575,4576,4577,4578,4579,4580,4581,4582,4583,4584,4585,4586,4587,4588,4589,4590,4591,4592,4593,4594,4595,4596,4597,4598,4599,4600,4601,4602,4603,4604,4605,4606,4607,4608,4609,4610,4611,4612,4613,4614,4615,4616,4617,4618,4619,4620,4621,4622,4623,4624,4625,4626,4757,4766,4770,4792,4799,4821,4824,4859,4880,4881,4883,4923,4924,4925,4927,4939,4977,4985,4989,4991,4992,4995,4996,5628,5645,5646,5654,5658,5659,5674,5676,5682,5687,5692,5693,5694,5695,5696,5707,5710,5711,5726,5730,5731,5732,5733,5734,5735,5736,5737,5738,5739,5740,5741,5742,5743,5744,5745,5746,5747,5748,5749,5750,5751,5752,5753,5754,5755,5756,5757,5758,5759,5760,5761,5762,5763,5764,5765,5766,5767,5768,5769,5770,5771,5772,5773,5774,5775,5776,5777,5778,5779,5780,5781,5782,5783,5784,5785,5786,5787,5788,5789,5790,5791,5792,5793,5794,5795,5796,5797,5798,5799,5800,5801,5802,5803,5804,5805,5806,5807,5808,5809,5810,5811,5812,5813,5814,5815,5816,5817,5818,5819,5820,5821,5822,5823,5824,5825,5826,5827,5828,5829,5830,5831,5832,5833,5834,5835,5836,5837,5841,5842,5843,5844,5873,5948,5949,5950,5952,5954,5955,5964,5995,6027,6028,6029,6030,6031,6032,6033,6034,6035,6036,6037,6039,6040,6041,6043,6044,6045,6053,6054,6055,6056,6058,6060,6064,6065,6066,6068,6071,6072,6086,6194,6195,6197,6198,6199,6200,6201,6202,6203,6204,6205,6207,6229,6230,6232,6233,6245,6246,6248,6262,6263,6264,6265,6288,6301,6302,6303,6304,6305,6306,6307,6328,6332,6333,6334,6339,6393,6407,6494,6496,6497,6498,6499,6500,6501,6502,6503,6505,6506,6512,6518,6519,6520,6521,6522,6523,6524,6525,6526,6544,6555,6556,6600,6612,6622,6639,6640,6641,6642,6643,6644,6645,6646,6647,6651,6652,6655,6713,6742,6746,6774,6776,6778,6779,6781,6782,6790,6791,6792,6794,6795,6796,6797,6798,6799,6800,6801,6802,6803,6836,6839,6840,6841,6843,6844,6845,6846,6847,6848,6849,6850,6851,6852,6853,6854,6855,6856,6860,6861,6862,6863,6864,6865,6866,6869,6870,6871,6872,6880,6881,6882,6883,6884,6885,6886,6887,6905,6906,6907,6908,6912,6921,6922,6923,6924,6925,6926,6927,6928,6929,6930,6931,6932,6933,6934,6935,6936,6937,6938,6939,6941,6942,6967,6969,6970,6971,6972,6973,6978,6979,6980,6981,7009,7010,7013,7035,7039,7044,7057,7059,7060,7061,7068,7069,7070,7075,7078,7079,7084,7089,7090,7091,7092,7093,7101,7102,7103,7104,7105,7111,7112,7113,7114,7115,7116,7122,7123,7124,7125,7126,7127,7133,7134,7135,7137,7145,7146,7148,7149,7150,7163,7164,7219,7225,7283,7284,7292,7311,7313,7333,7339,7355,7356,7357,7358,7359,7360,7361,7362,7363,7364,7365,7366,7367,7368,7369,7370,7371,7372,7373,7374,7375,7376,7377,7378,7379,7380,7381,7382,7383,7384,7385,7386,7387,7388,7389,7390,7391,7392,7393,7394,7395,7396,7397,7398,7399,7400,7401,7402,7403,7404,7405,7406,7407,7408,7409,7415,7416,7417,7433,7434,7435,7436,7437,7438,7439,7442,7443,7444,7445,7446,7447,7448,7449,7450,7451,7452,7453,7454,7455,7456,7457,7458,7459,7460,7461,7462,7463,7464,7465,7466,7467,7468,7469,7470,7471,7472,7473,7474,7475,7476,7477,7478,7479,7480,7481,7482,7483,7484,7485,7486,7487,7488,7489,7490,7491,7492,7493,7494,7495,7496,7497,7498,7499,7500,7501,7502,7503,7504,7505,7506,7507,7508,7509,7510,7511,7512,7513,7514,7515,7516,7517,7518,7519,7520,7521,7522,7523,7524,7525,7526,7527,7528,7529,7530,7531,7532,7533,7534,7535,7536,7537,7538,7539,7540,7541,7542,7543,7544,7545,7546,7547,7548,7550,7555,7556,7557,7558,7570,7571,7586,7589,7590,7591,7592,7601,7610,7627,7628,7629,7630,7631,7632,7633,7634,7635,7636,7641,7661,7690,7724,7725,7727,7728,7729,7730,7731,7732,7733,7734,7735,7736,7737,7739,7740,7741,7742,7743,7744,7745,7746,7747,7748,7749,7757,7758,7759,7761,7766,7767,7768,7769,7770,7771,7773,7774,7775,7778,7779,7780,7781,7782,7783,7784,7785,7786,7787,7788,7789,7790,7792,7793,7794,7797,7808,7812,7813,7818,7822,7825,7826,7827,7828,7829,7830,7832,7834,7848,7850,7851,7936,7970,7971,7974,7985,7989,7990,7991,7992,7994,7998,7999,8007,8009,8012,8016,8017,8021,8027,8028,8029,8030,8031,8032,8033,8034,8035,8036,8037,8038,8039,8040,8041,8049,8050,8051,8055,8056,8057,8061,8065,8066,8067,8068,8069,8073,8077,8079,8080,8081,8084,8085,8086,8087,8109,8110,8111,8121,8143,8144,8145,8155,8156,8157,8158,8161,8162,8168,8169,8170,8182,8187,8188,8190,8191,8192,8193,8217,8218,8219,8239,8270,8273,8274,8275,8276,8283,8284,8285,8286,8287,8288,8291,8318,8319,8320,8321,8331,8333,8334,8343,8344,8345,8347,8348,8350,8351,8353,8354,8355,8356,8357,8358,8359,8360,8361,8363,8365,8366,8367,8371,8374,8375,8376,8401,8424,8425,8426,8444,8447,8448,8449,8450,8451,8452,8453,8454,8455,8456,8457,8458,8459,8460,8461,8462,8463,8464,8465,8466,8467,8468,8469,8470,8471,8472,8473,8474,8475,8476,8477,8478,8479,8480,8481,8482,8483,8484,8485,8486,8487,8488,8489,8490,8491,8492,8493,8494,8495,8496,8497,8498,8499,8500,8501,8502,8503,8504,8505,8506,8507,8508,8509,8514,8515,8517,8518,8519,8520,8522,8523,8528,8529,8530,8531,8532,8533,8534,8535,8536,8537,8538,8539,8540,8541,8543,8544,8545,8546,8547,8548,8566,8584,8585,8586,8587,8588,8589,8590,8591,8592,8593,8594,8595,8596,8597,8598,8599,8600,8601,8602,8603,8604,8605,8606,8607,8608,8609,8611,8612,8613,8614,8615,8616,8617,8618,8620,8621,8622,8623,8624,8625,8626,8627,8628,8629,8630,8631,8636,8637,8638,8639,8640,8641,8642,8643,8644,8645,8646,8647,8648,8649,8650,8651,8652,8653,8654,8655,8662,8664,8666,8667,8673,8674,8675,8676,8678,8679,8680,8681,8682,8683,8684,8685,8686,9250,9258,9259,9263,9274,9275,9466,9467,9468,9469,9470,9471,9472,9484,9485,9486,9488,9489,9490,9491,9492,9493,9495,9496,9497,9525,9528,9531,9532,9533,9535,9537,9538,9540,9545,9546,9547,9548,9549,9550,9551,9552,9553,9554,9555,9557,9559,9561,9564,9565,9567,9568,9570,9574,9575,9576,9577,9578,9579,9580,9581,9582,9583,9584,9585,9586,9587,9590,9591,9595,9596,9597,9598,9599,9600,9601,9602,9603,9604,9605,9606,9607,9608,9614,9615,9619,9620,9623,9624,9625,9626,9629,9640,9641,9642,9646,9647,9648,9649,9650,9651,9652,9653,9654,9655,9656,9657,9658,9659,9660,9661,9662,9663,9664,9665,9666,9667,9668,9669,9670,9671,9672,9673,9674,9675,9676,9677,9678,9681,9682,9683,9684,9685,9686,9687,9688,9689,9690,9696,9697,9700,9701,9715,9721,9722,9723,9724,9725,9726,9731,9733,9734,9735,9736,9773,9774,9775,9776,9787,9788,9790,9791,9792,9805,9806,9811,9812,9813,9814,9815,9816,9817,9818,9819,9820,9829,9856,9864,9869,9870,9871,9872,9873,9874,9875,9883,9908,9909,9910,9911,9912,9913,9914,9915,9916,9917,9918,9919,9920,9921,9922,9923,9924,9931,9935,9936,9943,9944,9945,9946,9947,9948,9949,9950,9951,9953,9954,9955,9961,9963,9964,9965,9966,9967,9968,9969,9970,9971,9972,9973,9974,9975,9976,9994,9995,9996,9997,9998,9999,10000,10005,10012,10019,10020,10021,10031,10038,10044,10045,10048,10049,10050,10051,10052,10053,10054,10056,10057,10058,10059,10060,10061,10062,10063,10064,10066,10067,10069,10070,10071,10072,10073,10074,10075,10076,10077,10078,10079,10080,10081,10082,10083,10084,10085,10086,10087,10088,10089,10090,10091,10092,10093,10094,10095,10096,10121,10122,10123,10124,10125,10127,10128,10129,10130,10131,10133,10154,10155,10156,10157,10158,10164,10165,10167,10168,10169,10170,10171,10172,10173,10174,10280,10287,10288,10289,10290,10295,10296,10298,10311,10312,10313,10316,10318,10319,10320,10321,10322,10323,10324,10325,10326,10327,10328,10329,10330,10331,10332,10333,10334,10335,10336,10337,10338,10339,10340,10341,10342,10343,10344,10345,10346,10347,10348,10349,10350,10351,10352,10353,10354,10355,10356,10357,10358,10359,10360,10361,10362,10363,10364,10365,10366,10367,10368,10369,10370,10371,10372,10373,10374,10375,10385,10388,10396,10397,10398,10399,10400,10401,10417,10422,10423,10424,10426,10429,10430,10431,10432,10433,10434,10436,10444,10445,10446,10447,10448,10449,10450,10451,10452,10453,10458,10461,10462,10463,10464,10465,10466,10476,10479,10480,10481,10482,10483,10484,10485,10486,10487,10488,10489,10490,10491,10492,10499,10500,10501,10502,10503,10504,10507,10508,10513,10514,10515,10516,10519,10520,10521,10698,10699,10700,10701,10702,10705,10706,10707,10708,10709,10710,10750,10751,10752,10753,10754,10755,10756,10757,10758,10759,10760,10761,10762,10763,10764,10765,10766,10767,10768,10769,10770,10771,10772,10773,10774,10775,10776,10777,10778,10779,10780,10781,10782,10783,10788,10789,10790,10791,10792,10793,10794,10795,10796,10797,10798,10799,10800,10801,10802,10803,10804,10805,10806,10807,10808,10809,10810,10811,10812,10813,10814,10815,10816,10817,10818,10819,10820,10821,10822,10823,10824,10825,10826,10827,10828,10829,10830,10831,10832,10833,10834,10835,10836,10837,10838,10839,10840,10841,10842,10843,10844,10845,10846,10847,10848,10849,10850,10851,10852,10853,10854,10855,10856,10857,10858,10859,10860,10861,10862,10864,10865,10866,10867,10868,10869,10870,10871,10872,10873,10874,10875,10876,10877,10878,10879,10880,10882,10883,10884,10887,10888,10889,10890,10990,10991,10993,10996,10997,10998,10999,11000,11001,11004,11005,11006,11007,11008,11009,11010,11011,11024,11025,11028,11029,11030,11032,11033,11110,11111,11115,11116,11160,11161,11162,11163,11181,11195,11197,11198,11199,11200,11201,11207,11209,11210,11211,11228,11256,11272,11283,11286,11287,11291,11292,11293,11298,11299,11300,11303,11304,11309,11310,11311,11312,11313,11314,11315,11316,11317,11318,11385,11429,11432,11455,11458,11459,11460,11461,11462,11463,11526,11527,11528,11529,11530,11531,11532,11533,11534,11535,11536,11537,11538,11539,11540,11541,11542,11543,11544,11545,11546,11547,11548,11549,11550,11551,11552,11553,11554,11555,11556,11557,11558,11559,11560,11561,11562,11563,11564,11565,11566,11567,11568,11569,11570,11571,11572,11573,11574,11575,11576,11577,11578,11579,11580,11581,11582,11583,11584,11585,11586,11587,11588,11589,11590,11591,11592,11593,11594,11595,11596,11597,11598,11599,11600,11601,11602,11603,11604,11605,11606,11607,11608,11609,11610,11611,11612,11613,11614,11615,11616,11617,11618,11619,11620,11621,11622,11623,11624,11625,11626,11627,11628,11629,11630,11631,11632,11633,11634,11635,11636,11637,11638,11639,11640,11641,11642,11643,11644,11645,11646,11647,11648,11649,11650,11651,11652,11653,11654,11655,11656,11657,11658,11659,11660,11661,11662,11663,11664,11665,11666,11667,11668,11669,11670,11671,11672,11673,11674,11675,11676,11677,11678,11679,11680,11681,11682,11683,11684,11685,11686,11687,11688,11689,11690,11691,11692,11693,11694,11695,11696,11697,11698,11699,11700,11701,11702,11703,11704,11705,11706,11707,11708,11709,11710,11711,11712,11713,11714,11715,11716,11717,11718,11719,11720,11721,11722,11723,11724,11725,11726,11727,11728,11729,11730,11731,11732,11733,11734,11735,11736,11737,11738,11739,11740,11741,11742,11743,11744,11745,11746,11747,11748,11749,11750,11751,11752,11753,11754,11755,11756,11757,11758,11759,11760,11761,11762,11763,11764,11765,11766,11767,11768,11769,11770,11771,11772,11773,11774,11775,11776,11777,11778,11779,11780,11781,11782,11783,11784,11785,11786,11787,11788,11789,11790,11791,11792,11793,11794,11795,11796,11797,11798,11799,11800,11801,11802,11803,11804,11805,11806,11807,11808,11809,11810,11811,11812,11813,11814,11815,11816,11817,11818,11819,11820,11821,11822,11823,11824,11825,11826,11827,11828,11829,11830,11831,11832,11833,11834,11835,11836,11837,11838,11839,11840,11841,11842,11843,11844,11845,11846,11847,11848,11849,11850,11851,11852,11853,11854,11855,11856,11857,11858,11859,11860,11861,11862,11863,11864,11865,11866,11867,11868,11869,11870,11871,11872,11873,11874,11875,11876,11877,11878,11879,11880,11881,11882,11883,11884,11885,11886,11887,11888,11889,11890,11891,11892,11893,11909,11922,11923,11924,11925,11926,11927,11928,11929,11931,11932,11933,11934,12043,12091,12092,12093,12094,12095,12098,12101,12102,12103,12107,12108,12109,12110,12114,12115,12116,12128,12129,12130,12131,12219,12220,12221,12222,12223,12224,12225,12226,12231,12237,12240,12241,12242,12252,12281,12282,12283,12284,12288,12289,12290,12291,12295,12296,12297,12298,12299,12300,12303,12304,12305,12308,12309,12310,12311,12312,12313,12314,12315,12316,12317,12318,12319,12320,12321,12322,12323,12338,12339,12348,12349,12350,12351,12352,12353,12354,12355,12356,12357,12374,12380,12389,12390,12424,12425,12426,12427,12428,12435,12437,12447,12448,12449,12450,12451,12462,12464,12465,12466,12470,12471,12472,12474,12475,12476,12477,12478,12479,12480,12481,12482,12483,12486,12489,12490,12491,12492,12493,12495,12496,12497,12498,12499,12500,12501,12502,12503,12504,12505,12506,12507,12508,12512,12513,12514,12517,12518,12520,12521,12522,12523,12524,12525,12526,12527,12528,12529,12530,12541,12546,12547,12549,12554,12557,12558,12559,12560,12561,12562,12563,12564,12565,12567,12569,12574,12592,12593,12594,12595,12596,12597,12598,12599,12601,12603,12606,12607,12608,12613,12619,12622,12623,12624,12625,12627,12630,12632,12633,12636,12637,12638,12639,12642,12646,12647,12648,12649,12650,12651,12656,12657,12658,12659,12665,12667,12669,12672,12675,12677,12678,12681,12682,12686,12688,12689,12690,12691,12693,12695,12696,12698,12700,12702,12705,12706,12707,12708,12709,12710,12711,12712,12714,12715,12718,12719,12720,12721,12722,12723,12724,12725,12726,12728,12729,12730,12731,12732,12733,12734,12735,12737,12740,12741,12742,12743,12744,12747,12748,12749,12753,12754,12755,12756,12758,12759,12760,12761,12762,12763,12764,12765,12766,12767,12768,12769,12770,12771,12772,12773,12774,12775,12776,12777,12778,12779,12780,12781,12782,12783,12784,12785,12786,12788,12789,12792,12793,12796,12797,12798,12801,12802,12805,12808,12809,12814,12816,12817,12818,12837,12854,12855,12856,12857,12858,12859,12860,12861,12862,12863,12864,12865,12866,12867,12868,12869,12870,12871,12872,12873,12874,12875,12876,12877,12878,12879,12880,12881,12882,12886,12889,12890,12891,12894,12895,12896,12897,12898,12899,12901,12912,12913,12914,12915,12918,12919,12920,12921,12922,12923,12924,12926,12927,12945,12946,12947,12949,12950,12951,12952,12953,12954,12955,12956,12957,12958,12959,12960,12961,12962,12963,12964,12965,12966,12967,12968,12969,12976,12977,12978,12981,12982,12983,12984,12985,12986,12987,12988,12989,12990,12991,12992,12993,12994,12995,12997,13000,13002,13003,13004,13014,13057,13058,13059,13073,13074,13097,13099,13101,13102,13103,13109,13110,13112,13113,13115,13117,13134,13135,13136,13137,13138,13139,13140,13141,13143,13144,13145,13146,13147,13151,13152,13153,13154,13155,13156,13157,13158,13159,13160,13161,13197,13198,13199,13200,13201,13202,13203,13204,13205,13206,13207,13208,13209,13210,13211,13212,13213,13214,13215,13216,13217,13218,13219,13220,13221,13222,13223,13224,13225,13226,13227,13228,13229,13230,13231,13232,13233,13234,13235,13236,13237,13238,13239,13240,13241,13242,13243,13279,13281,13282,13283,13284,13285,13286,13287,13288,13289,13290,13291,13292,13293,13294,13301,13302,13304,13309,13310,13311,13312,13315,13316,13317,13318,13319,13320,13322,13323,13324,13325,13326,13327,13328,13329,13330,13331,13332,13333,13334,13335,13336,13337,13338,13339,13340,13341,13342,13343,13344,13345,13346,13347,13348,13349,13350,13351,13352,13353,13354,13355,13356,13357,13358,13375,13389,13390,13419,13420,13423,13424,13426,13427,13431,13432,13439,13440,13449,13450,13473,13474,13495,13496,13497,13498,13511,13525,13526,13527,13529,13531,13532,13533,13534,13535,13536,13542,13543,13544,13545,13546,13547,13548,13549,13550,13551,13559,13560,13561,13562,13567,13574,13575,13576,13577,13578,13579,13580,13581,13582,13583,13584,13585,13586,13587,13603,13604,13605,13606,13608,13609,13610,13611,13612,13613,13614,13615,13616,13617,13618,13619,13620,13621,13623,13624,13625,13626,13628,13629,13639,13640,13641,13642,13643,13644,13645,13646,13647,13648,13649,13650,13651,13652,13653,13654,13655,13656,13657,13658,13659,13660,13661,13662,13663,13664,13665,13666,13667,13668,13669,13670,13671,13672,13673,13674,13675,13676,13677,13678,13679,13680,13681,13682,13683,13684,13685,13686,13687,13688,13689,13690,13691,13692,13693,13694,13695,13696,13697,13698,13699,13700,13701,13702,13703,13704,13705,13706,13707,13708,13709,13710,13711,13712,13713,13714,13715,13716,13717,13718,13719,13720,13721,13722,13723,13724,13725,13726,13727,13728,13737,13741,13744,13745,13746,13747,13748,13749,13750,13751,13752,13753,13754,13755,13756,13757,13758,13759,13760,13761,13762,13763,13777,13779,13781,13784,13786,13803,13804,13805,13814,13836,13837,13838,13839,13840,13841,13887,13888,13890,13891,13892,13910,13911,13912,13913,13914,13915,13916,13917,13918,13919,13920,13921,13922,13923,13934,13942,13949,13950,13965,13966,13967,13968,13969,13975,13976,13977,13978,13979,13980,13981,13982,13983,13986,13987,13988,13989,13991,13992,13993,14014,14015,14016,14017,14018,14019,14020,14021,14022,14083,14088,14091,14092,14093,14095,14096,14097,14098,14099,14100,14101,14102,14103,14104,14105,14106,14107,14108,14109,14110,14112,14113,14114,14115,14116,14117,14118,14119,14120,14121,14122,14123,14124,14125,14126,14127,14128,14132,14136,14147,14148,14150,14156,14158,14159,14160,14161,14162,14163,14164,14165,14166,14167,14168,14169,14172,14173,14174,14181,14185,14186,14190,14191,14192,14193,14194,14195,14196,14197,14198,14203,14219,14221,14222,14223,14240,14305,14315,14316,14317,14318,14319,14320,14321,14322,14323,14324,14325,14326,14353,14354,14355,14356,14357,14358,14359,14360,14361,14362,14363,14364,14378,14397,14431,14432,14433,14434,14442,14459,14467,14468,14469,14470,14471,14472,14473,14474,14475,14484,14486,14487,14488,14489,14490,14493,14494,14495,14496,14497,14498,14499,14500,14501,14502,14503,14504,14506,14507,14508,14509,14511,14512,14516,14517,14518,14519,14521,14523,14549,14552,14553,14555,14556,14557,14558,14559,14560,14561,14562,14563,14564,14565,14566,14567,14568,14569,14570,14571,14591,14592,14604,14606,14669,14675,14678,14679,14680,14682,14683,14684,14685,14691,14705,14713,14714,14715,14723,14724,14725,14726,14730,14731,14734,14736,14737,14764,14766,14767,14768,14769,14770,14771,14772,14773,14774,14775,14776,14777,14778,14780,14798,14801,14802,14804,14805,14806,14807,14808,14809,14810,14811,14812,14813,14814,14816,14817,14818,14829,14830,14833,14834,14835,14836,14837,14840,14841,15843,15844,15845,15892,15907,15909,15911,15914,15916,15917,15918,15919,15920,15926,15935,15936,15937,15943,15944,15946,15947,15948,15949,15950,15951,15952,15954,15955,15956,15957,15959,15960,15961,15974,15975,15976,15977,15978,15979,15980,15982,15983,15990,15991,15992,15993,15994,16012,16023,16035,16037,16038,16041,16052,16053,16054,16055,16059,16060,16063,16064,16065,16066,16067,16068,16069,16070,16082,16083,16084,16085,16086,16087,16095,16096,16098,16099,16100,16101,16102,16103,16105,16106,16118,16119,16120,16121,16122,16123,16134,16146,16147,16148,16149,16150,16151,16179,16180,16181,16182,16183,16184,16185,16186,16187,16188,16189,16190,16247,16248,16249,16250,16251,16261,16262,16263,16266,16267,16268,16269,16270,16271,16272,16273,16274,16275,16276,16277,16296,16297,16298,16299]
//16921
for(var num = 0;num < listOfItems.length;num++){

    try{
        //console.log(listOfItems[num])
        var jsonData = findAllDrops.execute([listOfItems[num]])
        //var jsonData = findAllDrops.execute([num])


        //console.log(jsonData)

        //fs.writeFile(`./DetailedDropInfoByItemID/${Math.floor(num / 256)}/${num}.json`, JSON.stringify(jsonData), function (err) {
        fs.writeFile(`./DropInfoModifiedPercents/${Math.floor(listOfItems[num]/256)}/${listOfItems[num]}.json`, JSON.stringify(jsonData), function (err) {
                //console.log(`${Math.floor(num/256)}/${num}`)
                //fs.writeFile(`./Items/${Math.floor(num/256)}/${num}.json`, JSON.stringify(jsonData), function (err) {

                if (err) throw err;
                //console.log(`completed ${num}`);
            }
        );
    }catch(e){
        console.log(e)
    }

}

