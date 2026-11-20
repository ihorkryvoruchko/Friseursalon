import { jest } from '@jest/globals'

jest.unstable_mockModule('../src/repository/appointment.repository.js', () => ({
  selectAppointmentByDateAndEmployeeId: jest.fn(),
}))

const { generateTimeSlots } = await import('../src/service/slot.service.js')
const { selectAppointmentByDateAndEmployeeId } = await import('../src/repository/appointment.repository.js')

describe('generateTimeSlots() testen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  });

  it('Timeslots generieren mit keine Buchungen', async () => {
    selectAppointmentByDateAndEmployeeId.mockResolvedValue([])

    const result = await generateTimeSlots('2026-11-20', 1, '09:00', '09:45', 15)

    expect(selectAppointmentByDateAndEmployeeId).toHaveBeenCalledWith('2026-11-20', 1)
    expect(result).toEqual([
      { value: '09:00:00', isAvailable: true },
      { value: '09:15:00', isAvailable: true },
      { value: '09:30:00', isAvailable: true },
    ])
  })

  it('Timeslots generieren mit eine Buchung', async () => {
    selectAppointmentByDateAndEmployeeId.mockResolvedValue([
      { start_time: '09:15', end_time: '09:30' },
    ])

    const result = await generateTimeSlots('2026-11-20', 1, '09:00', '09:45', 15)

    expect(result).toEqual([
      { value: '09:00:00', isAvailable: true },
      { value: '09:15:00', isAvailable: false },
      { value: '09:30:00', isAvailable: true },
    ])
  })
})