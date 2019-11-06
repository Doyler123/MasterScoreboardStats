import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import OverUnderIcon from '@material-ui/icons/Exposure';
import EagleIcon from '@material-ui/icons/ExposureNeg2';
import BirdeIcon from '@material-ui/icons/ExposureNeg1';
import ParIcon from '@material-ui/icons/ExposureZero';
import BogeyIcon from '@material-ui/icons/ExposurePlus1';
import DoubleIcon from '@material-ui/icons/ExposurePlus2';
import ScratchIcon from '@material-ui/icons/HighlightOff';

import * as util from '../../util/AllHolesBarChartUtil'

const tabWidth = 50

 const AllHolesBarChart = (props) => {

    let {data, tab, handleTabChange, formatToolTip, formatBarLabel} = props

    return (
        <div>
            <ResponsiveContainer width='100%' aspect={3.0/1.0}>
                <BarChart
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="6 6" />
                    <XAxis interval={0} dataKey="hole"/>
                    <YAxis type="number" domain={[util.calculateDataMin, 'dataMax + 5']}/>
                    <Tooltip formatter={formatToolTip} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Bar dataKey="total" fill="#8884d8" >
                        {data.map((entry, index) => {
                            const color = util.getBarColour(entry, tab)
                            return color ? <Cell fill={color} /> : null;
                        })}
                        <LabelList dataKey="total" position="top" formatter={formatBarLabel}/>
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <Tabs
                value={tab}
                onChange={handleTabChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                >
                <Tab icon={<OverUnderIcon />} style={{ minWidth: tabWidth }} value='TotalToPar' label="OVER/UNDER" />
                <Tab icon={<ScratchIcon />} style={{ minWidth: tabWidth }} value='Scratch' label="SCRATCH" />
                <Tab icon={<DoubleIcon />} style={{ minWidth: tabWidth }} value='Double' label="DOUBLE" />
                <Tab icon={<BogeyIcon />} style={{ minWidth: tabWidth }} value='Bogey' label="BOGEY" />
                <Tab icon={<ParIcon />} style={{ minWidth: tabWidth }} value='Par' label="PAR" />
                <Tab icon={<BirdeIcon />} style={{ minWidth: tabWidth }} value='Birde' label="BIRDE" />
                <Tab icon={<EagleIcon />} style={{ minWidth: tabWidth }} value='Eagle' label="EAGLE" />
            </Tabs>
        </div>  
    );
}


export default AllHolesBarChart