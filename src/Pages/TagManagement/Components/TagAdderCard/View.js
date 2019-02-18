import React, {Component} from 'react';
import Style from './Style.module.scss';
import {View as Card} from '../../../../Components/Card';

class TagAdderCard extends Component
{
    render()
    {
        return (
            <div className={Style.TagAdderCard}>
                <Card title={'添加标签'}>
                    <div className={Style.content}>

                    </div>
                </Card>
            </div>
        );
    }
}

export default TagAdderCard;