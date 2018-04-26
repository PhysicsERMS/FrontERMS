/**
 * Date：2018/4/26
 * Author：Wangtaidong
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Info from '../../components/Admin/Personal/index';

const Personal = ({ dispatch, state }) => {
  const { user } = state.app;
  const { name, email, phone } = user;
  const infoProps = {
    name,
    email,
    phone,
    onChangePass() {
      dispatch({
        type: 'personal/showModal',
      });
    },
  };
  return (
    <div>
      <Info {...infoProps} />
    </div>
  );
};

Personal.propTypes = {
  dispatch: PropTypes.func,
  state: PropTypes.object,
};

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(Personal);
