import React, {PropTypes} from 'react';

export default class Html extends React.Component {
  static propTypes = {
    locals: PropTypes.object,
    props: PropTypes.any,
    body: PropTypes.any
  }

  render () {
    return (
      <html>
        <head>
          {this.renderHeader()}
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <link rel="apple-touch-icon" href="apple-touch-icon.png"/>
          <link href="/css/bootstrap.min.css" rel="stylesheet"/>
          <link href="/font-awesome/css/font-awesome.css" rel="stylesheet"/>
          <link href="/css/animate.css" rel="stylesheet"/>
          <link href="/css/style.css" rel="stylesheet"/>
        </head>
        <body>
          <div id='view' dangerouslySetInnerHTML={{__html: this.props.body}} />
          <script src="/js/jquery-2.1.1.js"></script>
          <script src="/js/bootstrap.min.js"></script>
          <script src="/js/plugins/metisMenu/jquery.metisMenu.js"></script>
          <script src="/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
          <script src="/js/plugins/flot/jquery.flot.js"></script>
          <script src="/js/plugins/flot/jquery.flot.tooltip.min.js"></script>
          <script src="/js/plugins/flot/jquery.flot.spline.js"></script>
          <script src="/js/plugins/flot/jquery.flot.resize.js"></script>
          <script src="/js/plugins/flot/jquery.flot.pie.js"></script>
          <script src="/js/plugins/peity/jquery.peity.min.js"></script>
          <script src="/js/demo/peity-demo.js"></script>
          <script src="/js/inspinia.js"></script>
          <script src="/js/plugins/pace/pace.min.js"></script>
          <script src="/js/plugins/jquery-ui/jquery-ui.min.js"></script>
          <script src="/js/plugins/gritter/jquery.gritter.min.js"></script>
          <script src="/js/plugins/sparkline/jquery.sparkline.min.js"></script>
          <script src="/js/demo/sparkline-demo.js"></script>
          <script src="/js/plugins/chartJs/Chart.min.js"></script>
          <script src="/js/plugins/toastr/toastr.min.js"></script>
          <script src="/js/site.js"></script>
          <script dangerouslySetInnerHTML={{__html: `window.__initialState = ${this.props.props};`}} />
          {this.renderFooter()}
        </body>
      </html>
    );
  }

  renderHeader () {
    if (this.props.locals && this.props.locals.header) {
      return this.props.locals.header.map(this.renderTag, this);
    }
  }

  renderFooter () {
    if (this.props.locals && this.props.locals.footer) {
      return this.props.locals.footer.map(this.renderTag, this);
    }
  }

  renderTag (tag) {
    tag.props = tag.props || {};
    if (tag.content) {
      tag.props.dangerouslySetInnerHTML = {__html: tag.content};
    }
    return (
      <tag.tag {...tag.props} />
    );
  }
}
