import {expect, describe, it, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const {gym} = await sut.execute({
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: -23.5732992,
      longitude: -46.6321408,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})