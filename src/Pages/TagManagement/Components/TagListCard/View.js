import React, {Component} from 'react';
import Style from './Style.module.scss';
import Card from '../../../../Components/Card/View';

class TagListCard extends Component
{
    render()
    {
        return (
            <div className={Style.TagListCard}>
                <Card title={'标签列表'}>
                    <div className={Style.cardContent}>

                    </div>
                </Card>
            </div>
        );
    }
}

export default TagListCard;