import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RecommendIcon from '@mui/icons-material/Recommend';

export default function BasicTable(prop: any) {
  const { index, brands } = prop
  let data = new Map()
  brands.forEach((brand: Brand, index: number) => {
    data.set(index, brand.data)
  })
  let rows = data.get(index)
  return (
    <TableContainer component={Paper} className='w-full h-full'>
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
          {rows.map((row: any, index: any) => (
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
