import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Function from '../../Function';
import Style from './Style.module.scss';

class FileInput extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            inputId: Function.randomString(),
            fileName: '选择文件',
        };
    }

    onInputChange = e =>
    {
        const {onFileInputChangeFunction} = this.props;
        this.setState({
            fileName: e.target.files[0].name,
        });
        onFileInputChangeFunction(e);
    };


    render()
    {
        const {inputId, fileName} = this.state;
        const {className, labelText, accept} = this.props;
        return (
            <div className={`custom-file ${Style.FileInput} ${className}`}>
                <input type="file"
                       className="custom-file-input"
                       id={inputId}
                       accept={accept}
                       onChange={this.onInputChange} />
                <label className={`custom-file-label ${Style.label}`}
                       htmlFor={inputId}
                       data-browse={labelText}>{fileName}</label>
            </div>
        );
    }
}

FileInput.propTypes = {
    className: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    onFileInputChangeFunction: PropTypes.func,
    accept: PropTypes.string,
};

export default FileInput;