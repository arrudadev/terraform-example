import { randomUUID } from 'node:crypto'

export type EntityProps<Props> = {
  id?: string
} & Props

export abstract class Entity<Props> {
  private _id: string
  protected props: Props

  constructor(props: EntityProps<Props>) {
    const { id, ...rest } = props
    this._id = id || randomUUID()
    this.props = rest as Props
    this.validate()
  }

  get id(): string {
    return this._id
  }

  protected abstract validate(): void
}
