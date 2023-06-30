import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'

import { Container, Header } from "./styles"

export default function DatePicker({onChange, onClose, date}){
    const [dateNow, setDateNow] = useState(new Date(date))

    return (
        <Container>
            {Platform.OS === 'ios' && (
                <Header>
                    <TouchableOpacity onPress={() => onClose()}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </Header>
            )}
            <DateTimePicker 
            value={dateNow}
            mode="date"
            display="default"
            onChange={(e, d) => {
                const currentDate = d || dateNow
                setDateNow(currentDate)
                onChange(currentDate)
            }}
            style={{backgroundColor: 'white'}}
            />
        </Container>
    )
}