import { defineComponent, ref,onBeforeMount,watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const meetup = ref([]),
          meetupNumber = ref(1),
          maxMeetupNumber = 5

    onBeforeMount(async()=>{
      meetup.value = await getMeetup(meetupNumber.value)
    })

    watch(meetupNumber,async ()=>{
      meetup.value = await getMeetup(meetupNumber.value)
    },{deep:true})

    return {
      meetup,
      maxMeetupNumber,
      meetupNumber
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" :disabled="meetupNumber == 1" @click="meetupNumber--">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div v-for="index in maxMeetupNumber" class="radio-group__button">
            <input
              :id="'meetup-id-' + index"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="index"
              v-model="meetupNumber"
            />
            <label :for="'meetup-id-' + index" class="radio-group__label">{{ index }}</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" :disabled="meetupNumber == maxMeetupNumber" @click="meetupNumber++">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetup.title }}</h1>
        </div>
      </div>

    </div>
  `,
})
