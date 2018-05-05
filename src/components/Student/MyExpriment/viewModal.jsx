/*
 * @Author: Maiduo
 * @Date: 2018-04-25 13:01:29
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import PDF from 'react-pdf-js';
import style from './pdf.less';


const modal = ({
                 fileUrl,
                 title,
                 viewModalVisible,
                 okText,
                 cancelText,
                 page,
                 pages,
                 onConfirm,
                 onCancel,
                 onDocumentComplete,
                 onPageComplete,
                 handlePrevious,
                 handleNext
               }) => {
  const modapOpt = {
    title,
    width: 968,
    maskClosable: false,
    visible: viewModalVisible,
    okText,
    cancelText,
    onOk: onConfirm,
    onCancel,
  };
  
  const renderPagination = (page, pages) => {
    let preButton = <li className={style.previous} onClick={handlePrevious}><Button size="small">上一页</Button></li>;
    if (page === 1) {
      preButton = <li className={style.previous}><Button size="small" disabled>上一页</Button></li>;
    }
    let nextButton = <li className={style.next} onClick={handleNext}><Button size="small">下一页</Button></li>;
    if (page === pages) {
      nextButton = <li className={style.next}><Button size="small" disabled>下一页</Button></li>;
    }
    return (
      <nav>
        <ul className={style.pager}>
          {preButton}
          {nextButton}
        </ul>
      </nav>
      );
  }

  let pagination = null;
  if (pages) {
    pagination = renderPagination(page, pages);
  }
  return (
    <Modal {...modapOpt}>
      {/*<iframe src={fileUrl} width="100%" height="650">
        此浏览器不支持在线预览，请下载后查看: <a href={fileUrl}>Download PDF</a>
      </iframe>*/}
      <div style={{border: '1px solid #e8e8e8'}}>
        <PDF
          file={fileUrl}
          onDocumentComplete={onDocumentComplete}
          onPageComplete={onPageComplete}
          page={page}
          scale={1.5}
        />
        {pagination}
      </div>
    </Modal>
  );
};

modal.propTypes = {
  fileUrl: PropTypes.string,
  title: PropTypes.string,
  viewModalVisible: PropTypes.bool,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  page: PropTypes.number,
  pages: PropTypes.number,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  onDocumentComplete: PropTypes.func,
  onPageComplete: PropTypes.func,
  handlePrevious: PropTypes.func,
  handleNext: PropTypes.func,
};

export default modal;
