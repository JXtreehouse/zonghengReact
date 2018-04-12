import React from 'react'
import { SegmentedControl, WingBlank, WhiteSpace } from 'antd-mobile'
import { TrainerCard } from './trainer-card'
import DateTab from '../../component/date-tab'
import './index.scss'
import { ZONGHENG_THEME_COLOR } from '../../utils'
import { connect } from 'react-redux'
import { CourseCard } from './course-card'

class Index extends React.Component {
    onChange = e => {
        this.props.dispatch({
            type: 'courseTypeChange',
            payload: e.nativeEvent.selectedSegmentIndex
        })
    }
    componentWillMount() {
        const ticket =
            process.env.NODE_ENV === 'production'
                ? this.props.match.params.ticket
                : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImYzMjk1YWUyMTEyMmUyYmRiYjlhZTAwZWM1NDRiNWQyNWY1ZDM3YzQiLCJpYXQiOjE1MjM1MTc1NDEsImV4cCI6MTUyMzY5MDM0MX0.bF76ZTVVic2Vl5aI7HvuPZakW4eEv4iku80gx33A1vM'
        localStorage.setItem('jwt_token', ticket)
    }

    render() {
        const course = () => {
            return this.props.courseType === 0 ? (
                <div>
                    <TrainerCard />
                    <TrainerCard />
                    <TrainerCard />
                </div>
            ) : (
                <div>
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                </div>
            )
        }

        return (
            <div>
                <WingBlank size="lg">
                    <WhiteSpace />
                    <SegmentedControl
                        values={['私教', '团课']}
                        onChange={this.onChange}
                        selectedIndex={this.props.courseType}
                        tintColor={ZONGHENG_THEME_COLOR}
                    />
                    <WhiteSpace />
                </WingBlank>
                <DateTab>
                    {() => {
                        return course()
                    }}
                </DateTab>
            </div>
        )
    }
}

const mapState = state => {
    return { ...state.course }
}

export default connect(mapState)(Index)