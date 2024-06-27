import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RecommendIcon from '@mui/icons-material/Recommend';

function createData(
  name: string,
  year: number,
  carplay: boolean,
  carlife: boolean,
  hicar: boolean,
  iccoa: boolean,
  recommend?: number,
) {
  return { name, year, carplay, carlife, hicar, iccoa, recommend };
}

const 现代 = [
  createData('途胜L(2024款)', 2024, true, true, false, false, 1),
  createData('索纳塔11代(2024款)', 2024, true, true, false, false, 1),
  createData('索纳塔10代(2023款)', 2023, false, true, false, false),
  createData('伊兰特7代(2023款)', 2023, false, true, false, false),
  createData('伊兰特7代(2025款 未上市)', 2024, false, true, false, false),
];
const KIA = [
  createData('EV5', 2023, true, true, false, false),
  createData('EV5', 2024, true, true, false, false),
];
const 大众 = [
  createData('朗逸', 2024, true, true, false, false),
  createData('凌渡', 2024, true, true, true, false, 1),
];
const 荣威 = [
  createData('i5(高配阉割)', 2024, true, true, true, false),
];
const 丰田 = [
  createData('卡罗拉', 2024, true, true, true, false, 1),
];
const 本田 = [
  createData('型格', 2023, false, true, false, false),
];
const 马自达 = [
  createData('昂克塞拉', 2023, true, true, false, false, 1),
];
const 名爵 = [
  createData('MG5', 2024, false, true, false, false),
];
const 尼桑 = [
  createData('轩逸', 2024, false, true, true, false),
];

export default function BasicTable(prop:any) {
  const { index } = prop
  let data = new Map()
  data.set(0, 现代)
  data.set(1, KIA)
  data.set(2, 大众)
  data.set(3, 荣威)
  data.set(4, 丰田)
  data.set(5, 本田)
  data.set(6, 马自达)
  data.set(7, 名爵)
  data.set(8, 尼桑)
  let rows = data.get(index)
  return (
    <TableContainer component={Paper} className='w-full ml-1'>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='font-bold'>车辆名称</TableCell>
            <TableCell align="center" className='font-bold'>年代</TableCell>
            <TableCell align="center" className='font-bold text-red-500'>CarPlay(Apple)</TableCell>
            <TableCell align="center" className='font-bold text-orange-500'>CarLife(BaiDu)</TableCell>
            <TableCell align="center" className='font-bold text-yellow-500'>HiCar(HuaWei)</TableCell>
            <TableCell align="center" className='font-bold text-green-500'>ICCOA(OPPO VIVO XiaoMi)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:any, index:any) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" className={row.recommend ? 'text-red-500' : ''}>
                <div className='flex items-center'>
                  {row.recommend ? <RecommendIcon className='h-full mr-[4px] text-base' /> : ''}
                  <div className={row.recommend ? 'font-bold' : ''}>{row.name}</div>
                </div>

              </TableCell>
              <TableCell align="center" className='font-bold'>{row.year}</TableCell>
              <TableCell align="center" className='font-bold'>{row.carplay ? 'S' : '-'}</TableCell>
              <TableCell align="center" className='font-bold'>{row.carlife ? 'S' : '-'}</TableCell>
              <TableCell align="center" className='font-bold'>{row.hicar ? 'S' : '-'}</TableCell>
              <TableCell align="center" className='font-bold'>{row.iccoa ? 'S' : '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
