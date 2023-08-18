import React, {ReactElement} from 'react';
import Star from '@mui/icons-material/Star';
import StarOutline from '@mui/icons-material/StarOutline';

interface StarRatingProps {
    rating: number;
    totalRatings: number;
}

export default function StarRating({rating, totalRatings}: StarRatingProps): ReactElement {
    const MAX_RATING = 5; // Maximum rating value

    const stars = Array.from({length: MAX_RATING}, (_, index) => (
        <span key={index}>
      {index < rating ? <Star/> : <StarOutline/>}
    </span>
    ));

    return (
        <div>
            {stars} ({totalRatings})
        </div>
    );
}


