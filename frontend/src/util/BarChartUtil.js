import React from 'react';
import {Cell} from 'recharts';
import {SCORES_TO_COLOURS} from '../constants/constants'

export const fillBar = (entry) => {
    return <Cell fill={SCORES_TO_COLOURS[entry.score]} />;
}