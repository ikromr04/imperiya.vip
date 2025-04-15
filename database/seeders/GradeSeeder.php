<?php

namespace Database\Seeders;

use App\Models\Grade;
use Illuminate\Database\Seeder;

class GradeSeeder extends Seeder
{
  public function run(): void
  {
    // $classes = array(
    //   array('id' => '1', 'bind' => '1', 'group' => 'А', 'level' => 8, 'pupils' => '["863","864","878","901","916","942","1023","1053","1078","1283","1287","1301","1304","1340","1358","1460","1471","1508","1565","1569","1620","1630"]', 'block' => '1', 'datetime' => '2024-08-21 13:47:47'),
    //   array('id' => '2', 'bind' => '1', 'group' => 'А', 'level' => 2, 'pupils' => '["1008","1011","1059","1068","1082","1086","1097","1106","1113","1143","1206","1290","1293","1491","1504","1571","1583","1621", "871"]', 'block' => '1', 'datetime' => '2024-08-23 14:49:31'),
    //   array('id' => '3', 'bind' => '1', 'group' => 'Б', 'level' => 2, 'pupils' => '["868","879","954","960","1001","1006","1018","1134","1137","1171","1196","1242","1274","1321","1468","1562","1605","1608", "996"]', 'block' => '1', 'datetime' => '2024-08-23 15:26:38'),
    //   array('id' => '7', 'bind' => '1', 'group' => 'А', 'level' => 1, 'pupils' => '["818","821","833","850","857","875","1037","1090","1103","1128","1168","1182","1216","1328","1363","1368","1399","1448","1451","1552","1570","1597","1600"]', 'block' => '1', 'datetime' => '2024-09-12 10:20:55'),
    //   array('id' => '4', 'bind' => '1', 'group' => 'А', 'level' => 3, 'pupils' => '["865","933","939","973","982","990","1020","1062","1119","1193","1199","1230","1269","1310","1317","1342","1518","1624"]', 'block' => '1', 'datetime' => '2024-08-23 15:34:46'),
    //   array('id' => '5', 'bind' => '1', 'group' => 'Б', 'level' => 3, 'pupils' => '["829","977","979","987","993","1039","1043","1060","1110","1205","1234","1239","1249","1252","1346","1353","1389","1443","1457","1490","1500"]', 'block' => '1', 'datetime' => '2024-08-23 15:40:09'),
    //   array('id' => '6', 'bind' => '1', 'group' => 'А', 'level' => 4, 'pupils' => '["909","947","956","1085","1093","1157","1175","1245","1335","1387","1424","1427","1429","1433","1436","1495","1548", "1642"]', 'block' => '1', 'datetime' => '2024-08-23 15:44:30'),
    //   array('id' => '8', 'bind' => '1', 'group' => 'Б', 'level' => 1, 'pupils' => '["815","844","847","853","874","965","1034","1125","1144","1150","1190","1202","1236","1265","1380","1418","1461","1482","1522","1577","1611","1614","1617"]', 'block' => '1', 'datetime' => '2024-09-12 10:26:06'),
    //   array('id' => '9', 'bind' => '1', 'group' => 'Б', 'level' => 4, 'pupils' => '["882","902","953","958","968","1003","1029","1065","1071","1122","1185","1224","1246","1367","1384","1514","1525","1580"]', 'block' => '1', 'datetime' => '2024-09-12 11:18:33'),
    //   array('id' => '10', 'bind' => '1', 'group' => 'В', 'level' => 4, 'pupils' => '["913","927","945","950","963","964","1042","1050","1075","1149","1181","1307","1327","1454","1474","1543", "1637"]', 'block' => '1', 'datetime' => '2024-09-12 11:22:47'),
    //   array('id' => '11', 'bind' => '1', 'group' => 'А', 'level' => 5, 'pupils' => '["826","836","837","856","870","898","920","923","1033","1118","1174","1180","1219","1220","1345","1356","1362","1377","1572","1587","1590","1593","1628", "1634"]', 'block' => '1', 'datetime' => '2024-09-12 11:31:30'),
    //   array('id' => '12', 'bind' => '1', 'group' => 'Б', 'level' => 5, 'pupils' => '["860","926","1014","1017","1038","1049","1081","1109","1140","1146","1188","1257","1262","1271","1276","1313","1337","1366","1383","1511","1539","1550","1575","1584"]', 'block' => '1', 'datetime' => '2024-09-12 11:36:17'),
    //   array('id' => '13', 'bind' => '1', 'group' => 'А', 'level' => 6, 'pupils' => '["830","972","976","1056","1160","1186","1208","1214","1223","1232","1326","1359","1439","1447"]', 'block' => '1', 'datetime' => '2024-09-12 11:39:38'),
    //   array('id' => '14', 'bind' => '1', 'group' => 'Б', 'level' => 6, 'pupils' => '["917","1024","1089","1096","1100","1163","1323","1341","1349","1352","1386","1475","1553","1566"]', 'block' => '1', 'datetime' => '2024-09-12 11:42:13'),
    //   array('id' => '15', 'bind' => '1', 'group' => 'А', 'level' => 7, 'pupils' => '["897","905","908","912","1026","1112","1131","1156","1268","1280","1299","1334","1442","1446","1464","1483","1506","1521","1626", "1559"]', 'block' => '1', 'datetime' => '2024-09-12 11:45:15'),
    //   array('id' => '16', 'bind' => '1', 'group' => 'А', 'level' => 9, 'pupils' => '["885","888","891","894","1072","1260","1277","1279","1402","1406","1421","1554","1558","1560","1603", "1639"]', 'block' => '1', 'datetime' => '2024-09-12 11:47:46'),
    // );

    $classes = array(
      array('id' => '1', 'level' => '3', 'group' => 'Б', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
      array('id' => '2', 'level' => '6', 'group' => 'Б', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL)
    );

    foreach ($classes as $classroom) {
      Grade::create([
        'id' => $classroom['id'],
        'level' => $classroom['level'],
        'group' => $classroom['group'],
        'created_at' => $classroom['created_at'],
        'updated_at' => $classroom['updated_at'],
        'deleted_at' => $classroom['deleted_at'],
      ]);
    }
  }
}
