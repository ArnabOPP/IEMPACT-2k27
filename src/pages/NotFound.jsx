import ComingSoon from '@/components/ComingSoon'

export default function NotFound() {
  return (
    <ComingSoon eyebrow="Error 404" title={<>Lost the <em>thread</em></>}>
      This page does not exist. The events are a good place to pick it back up.
    </ComingSoon>
  )
}
