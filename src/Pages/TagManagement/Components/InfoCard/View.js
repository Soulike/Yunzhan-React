import React, {Component} from 'react';
import style from './InfoCard.module.scss';
import {View as Card} from '../../../../Components/Card';
import {View as DividingLine} from './Components/DividingLine';
import NAMESPACE from '../../../../Namespace';
import {connect} from 'react-redux';

class InfoCard extends Component
{


    render()
    {
        const {
            [NAMESPACE.TAG_MANAGEMENT.BASIC_INFO.TAG_AMOUNT]: tagAmount,
            [NAMESPACE.TAG_MANAGEMENT.BASIC_INFO.USING_TAG_AMOUNT]: usingTagAmount,
        } = this.props;
        return (
            <div className={style.InfoCard}>
                <Card title={'标签信息'}>
                    <div className={style.infoWrapper}>
                        <div className={style.info}>
                            <div className={style.infoTitle}>总数量</div>
                            <div className={style.infoNumber} style={{color: '#09C'}}>{tagAmount | 0}</div>
                        </div>
                        <DividingLine />
                        <div className={style.info}>
                            <div className={style.infoTitle}>使用中</div>
                            <div className={style.infoNumber} style={{color: '#090'}}>{usingTagAmount | 0}</div>
                        </div>
                        <DividingLine />
                        <div className={style.info}>
                            <div className={style.infoTitle}>未使用</div>
                            <div className={style.infoNumber}
                                 style={{color: '#F00'}}>{(tagAmount - usingTagAmount) | 0}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state =>
{
    const {TagManagement: {basicInfo}} = state;
    return {...basicInfo};
};

export default connect(mapStateToProps)(InfoCard);
