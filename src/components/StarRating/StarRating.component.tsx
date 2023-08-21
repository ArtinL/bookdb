import React, {ReactElement} from 'react';
import Star from '@mui/icons-material/Star';
import StarOutline from '@mui/icons-material/StarOutline';
import {StarHalf} from "@mui/icons-material";

interface StarRatingProps {
    rating: number;
    totalRatings: number;
}

export default function StarRating({rating, totalRatings}: StarRatingProps): ReactElement {
    const MAX_RATING: number = 5;

    const stars: any = Array.from({length: MAX_RATING}, (_, index) => (
        <span key={index}>
            {index < rating - 0.5 ? (
                <Star/>
            ) : index === rating - 0.5 ? (
                <StarHalf/>
            ) : (
                <StarOutline/>
            )}
        </span>
    ));

    return (
        <div>
            {stars} ({totalRatings})
        </div>
    );
}


